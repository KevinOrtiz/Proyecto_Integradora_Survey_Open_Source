'use strict';
const usuario = require("../models/Usuarios");
const jwt = require('jsonwebtoken');
const config = require("../config");
const momento = require('moment');
const comentarios = require('../models/Comentarios');
const preguntas = require('../models/Preguntas');
const preguntasValidas = require('../models/preguntasValidadas');
const encuesta = require('../models/Encuestas');
let asyncloop = require('node-async-loop');
let redis = require('redis');
let client = redis.createClient();

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
        usuario.findOne({
                correo: req.body.usuario.correo
            })
            .then((response, err) => {
                let token = definirToken(req.body.token);
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
                            console.log('entro al final');
                            return resp.json({
                                "messaje": "Te Damos la Bienvenida, " + nuevoUsuario.nombre + nuevoUsuario.apellido,
                                "token": token,
                                "status": 200,
                                "_id": nuevoUsuario._id,
                                "roles": nuevoUsuario.roles
                            });
                        }
                    });
                } else {
                    return resp.json({
                        "messaje": "Nos alegra que hayas regresado, " + response.nombre + req.apellido,
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


};


/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next  
 */
exports.editarInformacionUsuario = (req, resp, next) => {
        usuario.findOneAndUpdate({
            "_id": req.body.id
        }, {
            $set: {
                "nombre": req.body.usuario.nombre,
                "apellido": req.body.usuario.apellido,
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
                    return resp.json({"status":200,"usuario":usuario})
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
                },
            }).populate({
                path: 'colaboradores',
                populate: {
                path: 'encuestaCompartida',
                model:'encuesta'
            },
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

let definirToken = (tokenSession) => {
    let payload = {
        user: tokenSession
    };
    let token = jwt.sign(payload, config.secret, {
        expiresIn: 86400
    });
    return token;
};




exports.getNumeroPreguntasValidasNoValidasByMonth = (req, res, next) => {
    var listaPreguntasByMonth = [];
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
                                };
                                listaPreguntasByMonth.push(preguntasChart);
                                next();
                                contador++;
                                if (contador === limiteDocumento) {
                                    console.log(listaPreguntasByMonth);
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
    var listaEncuestasByMonth = [];
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
                    };
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

};

exports.getOnlineUsers = (req, res, next) => {
    client.select(1, function (err, result) {
        client.multi()
            .keys('*', function(err, replies){
                console.log(replies);
                if (err) {
                    return res.json({
                        'status':500,
                        'valor':0
                    })
                }else{
                    return res.json({
                        'status':200,
                        'valor': replies.length
                    })
                }

            }).exec(function (err, replies) {});
    });
};

exports.getCountCommentsByPreguntas = (req, res, next) => {
    preguntas.find({'usuario_ID':req.query.id})
        .populate('comentarios')
        .then((resultado, error) => {
            if (error) {
                console.log(error);
            }else{
                if (resultado[0].comentarios === undefined){
                    return res.json({
                        'valor': 0
                    })
                }
                else {
                    let contadorComentariosPreguntas = 0;
                    let limiteDocumento = resultado.length;
                    let contador = 0;
                    asyncloop(resultado, (item, next) => {
                        contadorComentariosPreguntas = contadorComentariosPreguntas + item.comentarios.length;
                        contador ++;
                        next();
                        if (limiteDocumento === contador){
                            console.log('entre');
                            return res.json({
                                "valor":contadorComentariosPreguntas
                            })

                        }

                    },(error) => {
                        console.log(error);
                        if (error){
                            return res.json({
                                "valor":0
                            })
                        }

                    });

                }
            }


        }).catch((error) => {
            console.log(error);
            return res.json({
                "status":500,
                "messaje": error,
                "valor":0
            })
    })
};




exports.getCountCommentsByEncuestas = (req, res, next) => {
    encuesta.find({'usuario_ID':req.query.id})
        .populate('comentarios')
        .then((encuesta, error) => {
            if (error) {
                console.log(error);
            }else {
                if (encuesta[0].comentarios === undefined) {
                    return res.json({
                        'valor': 0
                    })
                }else {
                    let contadorComentarios = 0;
                    let contador = 0;
                    let limiteDocumento = encuesta.length;
                    asyncloop(encuesta, (item, next) => {
                        contadorComentarios = contadorComentarios + item.comentarios.length;
                        contador ++;
                        next();
                        if (limiteDocumento === contadorComentarios){
                            return res.json({
                                'valor':  contadorComentarios
                            })
                        }
                    },(error) => {
                        if (error) {
                            return res.json({
                                'valor':0
                            })
                        }
                    });

                }
            }

        }).catch((error) => {
            return res.json({
                "status":500,
                "messaje":error,
                'valor':0
            })
    });

};

exports.getCountCommentsAcertados = (req, res, next) => {
  preguntas.find({'usuario_ID':req.query.id})
      .populate('comentarios')
      .then((pregunta, error) => {
          if (error) {
              console.log(error);
          }else {
              let contadorLikes = 0;
              let contadorRegistro = 0;
              let limiteDocumento = pregunta.comentarios.length;
              asyncloop(pregunta.comentarios, (item, next) => {
                  contadorLikes = contadorLikes + item.likes;
                  contadorRegistro ++;
                  next();
                  if (contadorRegistro == limiteDocumento) {
                      return res.json({
                          'valor':contadorLikes
                      })
                  }
              },(error) => {
                  if (error) {
                      return res.json({
                          'valor': 0
                      })
                  }
              })
          }

      }).catch((error) => {
          console.log(error);
          return res.json({
              'valor':0
          })

  })
};

