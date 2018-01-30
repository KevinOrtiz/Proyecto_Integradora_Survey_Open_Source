'use strict'
const usuario = require("../models/Usuarios");
const jwt = require('jsonwebtoken');
const config = require("../config");
const momento = require('moment');
const comentarios = require('../models/Comentarios');
const preguntas = require('../models/Preguntas');
const preguntasValidas = require('../models/preguntasValidadas');
const discusionesPreguntas = require('../models/discusionesPregutas');
const encuesta = require('../models/Encuestas');
let asyncloop = require('node-async-loop');
let _ = require('underscore-node');

const meses = [{
    'nombre': 'Enero',
    'indice': 1,
    'fecha_inicio': new Date(2018, 1, 1),
    'fecha_fin': new Date(2018, 1, 30)
}, {
    'nombre': 'Febrero',
    'indice': 2,
    'fecha_inicio': new Date(2018, 2, 1),
    'fecha_fin': new Date(2018, 2, 30)
}, {
    'nombre': 'Marzo',
    'indice': 3,
    'fecha_inicio': new Date(2018, 3, 1),
    'fecha_fin': new Date(2018, 3, 30)
}, {
    'nombre': 'Abril',
    'indice': 4,
    'fecha_inicio': new Date(2018, 4, 1),
    'fecha_fin': new Date(2018, 4, 30)
}, {
    'nombre': 'Mayo',
    'indice': 5,
    'fecha_inicio': new Date(2018, 5, 1),
    'fecha_fin': new Date(2018, 5, 30)
}, {
    'nombre': 'Junio',
    'indice': 6,
    'fecha_inicio': new Date(2018, 6, 1),
    'fecha_fin': new Date(2018, 6, 30)
}, {
    'nombre': 'Julio',
    'indice': 7,
    'fecha_inicio': new Date(2018, 7, 1),
    'fecha_fin': new Date(2018, 7, 30)
}, {
    'nombre': 'Agosto',
    'indice': 8,
    'fecha_inicio': new Date(2018, 8, 1),
    'fecha_fin': new Date(2018, 8, 30)
}, {
    'nombre': 'Septiembre',
    'indice': 9,
    'fecha_inicio': new Date(2018, 9, 1),
    'fecha_fin': new Date(2018, 9, 30)
}, {
    'nombre': 'Octubre',
    'indice': 10,
    'fecha_inicio': new Date(2018, 10, 1),
    'fecha_fin': new Date(2018, 10, 30)
}, {
    'nombre': 'Noviembre',
    'indice': 11,
    'fecha_inicio': new Date(2018, 11, 1),
    'fecha_fin': new Date(2018, 11, 30)
}, {
    'nombre': 'Diciembre',
    'indice': 12,
    'fecha_inicio': new Date(2018, 12, 1),
    'fecha_fin': new Date(2018, 12, 30)
}]

/**
 * Cuando un usuario se loguea a-traves de google o espol, 
 * se genera automaticamente un token que sera enviado al usario para que sea guardado en su session 
 * storage
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */

exports.crearUsuario = (req, resp, next) => {
    if (validoDatosUsuario(req.body.usuario)) {
        usuario.findOne({
                nombre: req.body.usuario.nombre,
                apellido: req.body.usuario.apellido
            })
            .then((response, err) => {
                let token = definirToken(req.body.usuario);
                if (err) {
                    return resp.json({
                        "messaje": "error en la base de datos",
                        "status": 500
                    });
                } else if (!response) {
                    let nuevoUsuario = new usuario(req.body.usuario);
                    nuevoUsuario.save((error) => {
                        if (error) {
                            return resp.json({
                                "messaje": "existe un error en la BD en guardar la informacion",
                                "status": 400
                            });
                        } else {
                            return resp.json({
                                "messaje": "Te Damos la Bienvenida, " + req.body.usuario.nombre + req.body.usuario.apellido,
                                "token": token,
                                "status": 200,
                                "_id": nuevoUsuario._id,
                                "roles": nuevoUsuario.roles
                            });
                        }
                    });
                } else {
                    return resp.json({
                        "messaje": "Nos alegra que hayas regresado, " + req.body.usuario.nombre + req.body.usuario.apellido,
                        "token": token,
                        "status": 200,
                        "_id": response._id,
                        "roles": response.roles
                    });
                }

            }).catch((rejection) => {
                console.log("Ha ocurrido un error en la funcion " + rejection);
                return resp.json({"status":500})
            });

    } else {
        return resp.json({
            "messaje": "el tipos de datos enviados no son correctos",
            "status": 407
        });
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next  
 */
exports.editarInformacionUsuario = (req, resp, next) => {
        usuario.findOneAndUpdate({
            "_id": req.body.usuario._id
        }, {
            $set: {
                "nombre": req.body.usuario.nombre,
                "apellido": req.body.usuario.apellido,
                "correo": req.body.usuario.correo,
                "urlImage": req.body.usuario.urlImage,
                "institucion": req.body.usuario.institucion,
                "grado_academico": req.body.usuario.grado_academico,
                "area_academica": req.body.usuario.area_academica
            }
        }, {
            new: true,
            upsert: true
        }).then((usuario, err) => {
            if (err) {
                return resp.json({
                    "messaje": "error en actualizar en la base de datos",
                    "status": 500
                });
            } else {
                return resp.json({
                    "messaje": "usuario actualizado",
                    "data": usuario,
                    "status": 200
                });
            }

        }).catch((rejection) => {
            console.log(rejection);
            return resp.json({"status":500})
        })

};

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */

exports.eliminarUsuario = (req, resp, next) => {
    usuario.findOneAndRemove({
        idUsuario: req.params
    }, (err, user) => {
        if (err) {
            return resp.status(500).send({
                "messaje": "hubo un problema en el servidor de Base de datos"
            });
        }
        return resp.status(200).send({
            "messaje": "usuarioEliminado"
        });
    });
}

exports.cargarPerfilUsuario = (req, resp, next) => {
    usuario.findOne({"_id":req.query.id},"nombre apellido correo urlImage institucion grado_academico area_academica")
           .then((usuario, error)=>{
                if(error){
                    console.log(error);
                    return resp.json({"status":500})
                }else{
                    return resp.json({"status":200,"usuarioObject":usuario})
                }
           }).catch((error) => {
                console.log(error);
                return resp.json({"status":500});
           });
    
};


/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */
exports.cargarNotificaciones = (req, resp, next) => {
        usuario.findOne({
                _id: req.query.id,
                tipo: req.query.tipoNotificacion
            })
            .populate({
                path:'notificaciones',
                populate:{
                    path: 'usuario_emisor',
                    model: 'usuario'
                }})
            .then((usuario, err) => {
                if (err) {
                    console.log(error);
                    return resp.json({
                        "status":500
                    })
                }else {
                    return resp.json({
                        "status":200,
                        "listaNotificacion":usuario.notificaciones
                    })
                }
            }).catch((err) => {
                console.log("Hubo un error en la ejecucion del query " + err);
                return resp.json({"status":500})
            });
};

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */
exports.cargarListaMisColaboradores = (req, resp, next) => {
        usuario.findOne({
                _id: req.query.id
            })
            .populate({
                path: 'colaboradores',
                populate: {
                    path: 'usuarioColaborador',
                    model:'usuario'
                }
            })
            .then((datosUsuario, err) => {
                if (err) {
                    console.log('error en la extraccion de lista de colaboradores');
                    return resp.json({
                        "status":500
                    })
                }else {
                    return resp.json({
                        "status":200,
                        "misColaboradores":datosUsuario.colaboradores
                    })
                }
            }).catch((err) => {
                console.log("error en la ejecucion del query " + err);
                return resp.json({
                    "status":500
                })
            });
};

/**
 * Esta funcion  lo que hace es validar que los datos que vienen del servidor sean del tipo correcto
 * Si uno de los parametros es incorrecto entonces retorna falso con la descripcion del tipo de dato incorrecto
 * @param {*} datosUsuario 
 */

let validoDatosUsuario = (datosUsuario) => {
    var expCorreo = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (datosUsuario.nombre !== "" && datosUsuario.apellido !== "" && expCorreo.test(datosUsuario.correo) &&
        datosUsuario.correo !== "" && momento(datosUsuario.fecha_entrada).isValid() && momento(datosUsuario.fecha_salida).isValid()) {
        return true
    }
    return false;
};


/**
 * 
 * @param {*} datosUsuario 
 */

let definirToken = (datosUsuario) => {
    let payload = {
        user: datosUsuario.nombre + datosUsuario.apellido
    };
    var token = jwt.sign(payload, config.secret, {
        expiresIn: 86400
    });
    return token;
};



exports.getNumeroActividadesByMonth = (req, res, next) => {
    var comentariosByMonth = []
    let contador = 0;
    let limiteDocumento = meses.length;
    asyncloop(meses, (item, next) => {
        comentarios.find({
                'creador.0.ID': req.query.id,
                'fecha_creacion': {
                    $gte: item.fecha_inicio,
                    $lt: item.fecha_fin
                }
            })
            .then((comentarios, err) => {
                if (err) {
                    return res.json({
                        "status": 500
                    });
                } else {
                    let c_likes = _.reduce(comentarios, (memo, reading) => {
                        return memo + reading.likes;
                    }, 0);
                    let c_dislike = _.reduce(comentarios, (memo, reading) => {
                        return memo + reading.dislikes;
                    }, 0);
                    let c_favoritos = _.reduce(comentarios, (memo, reading) => {
                        return memo + reading.favoritos;
                    }, 0);
                    var comentarioChart = {
                        'mes': item.nombre,
                        'indice': item.indice,
                        'cantidadComentarios': comentarios.length,
                        'cantidadLikes': c_likes,
                        'cantidadDislike': c_dislike,
                        'cantidadFavoritos': c_favoritos
                    }
                    comentariosByMonth.push(comentarioChart);
                    next();
                    contador++;
                    if (contador === limiteDocumento) {
                        return res.json({
                            "status": 200,
                            "chartComentarios": comentariosByMonth
                        });
                    }
                }
            }).catch((error) => {
                console.log(error);
                return res.json({
                    "status": 500,
                    "messaje": "problemas en la obtencio de datos del"
                })
            });
    });
}


exports.getNumeroPreguntasValidasNoValidasByMonth = (req, res, next) => {
    var listaPreguntasByMonth = []
    let contador = 0;
    let limiteDocumento = meses.length;
    asyncloop(meses, (item, next) => {
        preguntas.count({
                'usuario_ID': req.query.id,
                'fecha_creacion': {
                    $gte: item.fecha_inicio,
                    $lt: item.fecha_fin
                }
            })
            .then((preguntas, error) => {
                if (error) {
                    return res.json({
                        "status": 500,
                        "messaje": "error en la consulta de informacion"
                    });
                } else {
                    preguntasValidas.count({
                            'usuario_ID': req.query.id,
                            'fecha_creacion': {
                                $gte: item.fecha_inicio,
                                $lt: item.fecha_fin
                            }
                        })
                        .then((preguntasValidas, error) => {
                            if (error) {
                                return res.json({
                                    "status": 500,
                                    "messaje": "error en la obtencion de informacion de la base de datos"
                                })
                            } else {
                                var preguntasChart = {
                                    'mes': item.nombre,
                                    'indice': item.indice,
                                    'cantidadpreguntas': preguntas,
                                    'cantidadpreguntasvalidas': preguntasValidas
                                }
                                listaPreguntasByMonth.push(preguntasChart);
                                next();
                                contador++;
                                if (contador === limiteDocumento) {
                                    return res.json({
                                        "status": 200,
                                        "listaPreguntas": listaPreguntasByMonth
                                    });
                                }

                            }
                        }).catch((error) => {
                            return res.json({
                                "status": 500,
                                "messaje": "error en la conexion del servidor"
                            })
                        })
                }
            }).catch((error) => {
                return res.json({
                    "status": 500,
                    "messaje": "error en la conexion del servidor"
                })
            })
    });


};

exports.getNumeroEncuestasByMonth = (req, res, next) => {
    var listaEncuestasByMonth = []
    let contador = 0;
    let limiteDocumento = meses.length;
    asyncloop(meses, (item, next) => {
        encuesta.count({
                "usuario_ID": req.query.id,
                'fecha_creacion': {
                    $gte: item.fecha_inicio,
                    $lt: item.fecha_fin
                }
            })
            .then((encuestas, err) => {
                console.log(encuestas);
                if (err) {
                    return res.json({
                        "status": 500
                    })
                } else {
                    var encuestasChart = {
                        'mes': item.nombre,
                        'indice': item.indice,
                        'cantidadEncuesta': encuestas
                    }
                    listaEncuestasByMonth.push(encuestasChart);
                    next();
                    contador++;
                    if (contador === limiteDocumento) {
                        return res.json({
                            "status": 200,
                            "listaEncuestas": listaEncuestasByMonth
                        });
                    }

                }
            }).catch((error) => {
                return res.json({
                    "status": 500
                })
            })
    })

}

exports.loadFirstCommentsByPreguntas = (req, res, next) => {
    var listaComentariosByPreguntas = [];
    preguntas.find({
            'usuario_ID': req.query.id
        })
        .slice('comentarios', 5)
        .sort({
            'fecha_creacion': -1
        })
        .limit(5)
        .populate('comentarios', ['creador', 'contenido', 'fecha_creacion', 'likes', 'dislikes', 'favoritos'])
        .then((preguntas, error) => {
            if (error) {
                return res.json({
                    "status": 500
                })
            } else {
                contador = 0;
                limiteDocumento = preguntas.length;
                asyncloop(preguntas, (item, next) => {
                    asyncloop(item.comentarios, (itemComentario, nextComentario) => {
                        usuario.findOne({
                                "_id": itemComentario.creador.ID
                            }, 'nombre apellido urlImage institucion grado_academico')
                            .then((usuario, error) => {
                                if (error) {
                                    nextComentario()
                                    return res.json({
                                        "status": 500
                                    })
                                } else {
                                    var comentariosPreguntas = {
                                        'nombreUsuario': usuario.nombre + usuario.apellido,
                                        'urlImage': usuario.urlImage,
                                        'institucion': usuario.institucion,
                                        'grado_academico': usuario.grado_academico,
                                        'contenido': itemComentario.contenido,
                                        'fecha_creacion': itemComentario.fecha_creacion,
                                        'likes': itemComentario.likes,
                                        'dislikes': itemComentario.dislikes,
                                        'favoritos': itemComentario.favoritos,
                                        'pregunta': item.descripcion,
                                        'topico': item.topicos.texto
                                    }
                                    listaComentariosByPreguntas.push(comentariosPreguntas);
                                    nextComentario();
                                    if (contador === limiteDocumento) {
                                        return res.json({
                                            "status": 200,
                                            "listaComentarios": listaComentariosByPreguntas
                                        })
                                    }
                                }
                            }).catch((error) => {
                                return res.json({
                                    "status": 500
                                })
                            });
                    }, (errorLoopInterno) => {
                        if (errorLoopInterno) {
                            console.log(errorLoopInterno)
                        }
                        next();
                        contador++;
                    });
                }, (error) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            return res.json({
                "status": 500
            })
        });
}

exports.getDiscusionesByPreguntas = (req, res, next) => {
    var listaDiscusionesCreadasByPregunta = [];
    preguntas.find({
        'usuario_ID': req.query.id
    })
    .slice('discusiones', 5)
    .sort({
        'fecha_creacion': 1
    })
    .limit(5)
    .populate('discusiones', ['titulo', 'descripcion'])
    .then((preguntas, error) => {
        if (error) {
            return res.json({
                "status": 500
            })
        } else {
            contador = 0;
            limiteDocumento = preguntas.length;
            asyncloop(preguntas, (item, next) => {
                asyncloop(item.discusiones, (itemDiscusiones, nextDiscusion) => {
                    usuario.findOne({
                            "_id": itemDiscusiones.creador_ID
                        }, 'nombre apellido urlImage institucion grado_academico')
                        .then((usuario, error) => {
                            if (error) {
                                nextDiscusion()
                                return res.json({
                                    "status": 500
                                })
                            } else {
                                var discusionPreguntas = {
                                    'nombreUsuario': usuario.nombre + usuario.apellido,
                                    'urlImage': usuario.urlImage,
                                    'institucion': usuario.institucion,
                                    'grado_academico': usuario.grado_academico,
                                    'titulo': itemDiscusiones.titulo,
                                    'descripcion': itemDiscusiones.descripcion
                                }
                                listaDiscusionesCreadasByPregunta.push(discusionPreguntas);
                                nextDiscusion();
                                if (contador === limiteDocumento) {
                                    return res.json({
                                        "status": 200,
                                        "listaDiscusiones": listaDiscusionesCreadasByPregunta
                                    })
                                }
                            }
                        }).catch((error) => {
                            return res.json({
                                "status": 500
                            })
                        });
                }, (errorLoopInterno) => {
                    if (errorLoopInterno) {
                        console.log(errorLoopInterno)
                    }
                    next();
                    contador++;
                });
            }, (error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        return res.json({
            "status": 500
        })
    });

}

