const Comentario = require('../models/Comentarios');
const Pregunta = require('../models/Preguntas');
const Usuario = require('../models/Usuarios');
const discusionPregunta = require('../models/discusionesPregutas');
const correo = require('../correo');
const preguntasValidas = require('../models/preguntasValidadas');
let asyncloop = require('node-async-loop');

exports.guardarDiscusion = (req, resp, next) => {
    if (req.body.tipoDiscusion === 'pregunta') {
        var objetoPregunta = new discusionPregunta(req.body.respuestaDiscusion);
        console.log(objetoPregunta);
        objetoPregunta.save()
            .then((res) => {
                console.log(res);
                Pregunta.findByIdAndUpdate({
                    '_id': req.body.idCuerpoDiscusion
                }, {
                    $push: {
                        'discusiones': objetoPregunta
                    }
                }, {
                    'new': true,
                    'upsert': true
                }).then((pregunta, error) => {
                    console.log("**********");
                    console.log(pregunta);
                    console.log("**********");
                    Usuario.findOne({
                        '_id': pregunta.usuario_ID
                    }).then((usuario, error) => {
                        correo.sendCorreoDiscusionCreada(usuario.correo, usuario.nombre, req.body.respuestaDiscusion.titulo);
                    });
                    if (error) {
                        return resp.json({
                            "status": 500
                        });
                    } else {
                        return resp.json({
                            "status": 200
                        });
                    }
                });
            }).catch((error) => {
                console.log('error');
                console.log(error);
            });
    }
}

exports.loadListaDiscusiones = (req, resp, next) => {
    if (req.query.tipoDiscusion == 'pregunta') {
        const listaDiscusiones = [];
        Pregunta.findOne({
                "_id": req.query.idcuerpodiscusion
            })
            .populate('discusiones')
            .then((pregunta, error) => {
                if (error) {
                    console.log(error);
                    return resp.json({
                        "status": 500,
                        "messaje": "ha existido en el error de la consulta",
                        "discusiones": null
                    })
                } else {
                    let contador = 0;
                    let totalDocumento = pregunta.discusiones.length;
                    asyncloop(pregunta.discusiones, (item, next) => {
                        Usuario.findOne({
                                '_id': item.creador_ID
                            })
                            .then((usuario, error) => {
                                var discusion = {
                                    creador: usuario.nombre + usuario.apellido,
                                    urlUsuario: usuario.urlImage,
                                    titulo: item.titulo,
                                    etiquetas: item.etiquetas,
                                    descripcion: item.descripcion,
                                    _id: item._id,
                                    numeroComentarios: item.comentarios.length,
                                    fecha_creacion: item.fecha_creacion,
                                    fecha_cierre: item.fecha_cierre,
                                    creador_ID: item.creador_ID,
                                    estados: item.estados[0].texto
                                }
                                listaDiscusiones.unshift(discusion);
                                next();
                                contador++;
                                if (contador == totalDocumento) {
                                    return resp.json({
                                        'discusiones': listaDiscusiones,
                                        "status": 200
                                    });

                                }
                            }).catch((error) => {
                                console.log(error);
                                return resp.json({
                                    "discusiones": null,
                                    "status": 500
                                })
                            })
                    });
                }
            }).catch((error) => {
                console.log(error);
                return resp.json({
                    "discusiones": null,
                    "status": 500
                })
            });
    }
}

exports.loadListaMisDiscusiones = (req, resp, next) => {
    console.log("entre");
    console.log(req.query);
    if (req.query.tipoDiscusion == 'pregunta') {
        discusionPregunta.find({
                'creador_ID': req.query.id,
                'titulo': {
                    $ne: 'Pregunta propuesta'
                },
            })
            .then((discusion, error) => {
                if (error) {
                    return resp.json({
                        "status": 500,
                        "messaje": 'error en la obtencion de datos del usuario'
                    })
                } else {
                    let listaDiscusion = [];
                    let numeroElementosDiscusion = discusion.length;
                    let contador = 0;
                    console.log("&&&&&&&&&&&&&");
                    console.log(discusion);
                    console.log(discusion.length);
                    console.log("&&&&&&&&&&&&&");
                    asyncloop(discusion, (item, next) => {
                        var objectDiscusionPregunta = {
                            _id: item._id,
                            titulo: item.titulo,
                            etiquetas: item.etiquetas,
                            fecha_creacion: item.fecha_creacion,
                            fecha_cierre: item.fecha_cierre,
                            pregunta_ID: item.pregunta_ID
                        }
                        listaDiscusion.push(objectDiscusionPregunta);
                        next();
                        contador++;
                        console.log(listaDiscusion);
                        if (contador == numeroElementosDiscusion) {
                            return resp.json({
                                "listadiscusionPregunta": listaDiscusion,
                                "status": 200
                            })
                        }
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
    }
}

exports.loadMyDiscusion = (req, resp, next) => {
    if (req.query.tipoDiscusion == 'pregunta') {
        discusionPregunta.findOne({
                '_id': req.query.id
            })
            .then((discusion, error) => {
                console.log(discusion);
                if (error) {
                    console.log(error);
                } else {
                    return resp.json({
                        "status": 200,
                        "discusion": {
                            titulo: discusion.titulo,
                            fecha_creacion: discusion.fecha_creacion,
                            descripcion: discusion.descripcion,
                            etiquetas: discusion.etiquetas,
                            numeroComentarios: discusion.comentarios.length,
                            pregunta_ID: discusion.pregunta_ID,
                            fecha_cierre: discusion.fecha_cierre,
                            estados: discusion.estados[0].texto
                        }
                    })
                }
            }).catch((error) => {
                console.log(error);
            });
    }
}

exports.editMyDiscusion = (req, resp, next) => {
    console.log('llegue !!!');
    console.log(req.body);
    if (req.body.tipoDiscusion == 'pregunta') {
        discusionPregunta.findOneAndUpdate({
                '_id': req.body.id
            }, req.body.respuestaDiscusion, {
                upsert: true,
                new: true
            })
            .then((discusion, error) => {
                return resp.json({
                    "status": 200,
                    "discusionActualizada": discusion
                })
            }).catch((error) => {
                console.log(error);
            });
    }
}

exports.removeMyDiscusion = (req, resp, next) => {
    console.log(req.query);
    if (req.query.tipoDiscusion == 'pregunta') {
        discusionPregunta.findByIdAndRemove({
                '_id': req.query.id
            })
            .then((discusion, error) => {
                console.log(discusion);
                Pregunta.findByIdAndUpdate({
                        '_id': req.query.pregunta_ID
                    }, {
                        $pull: {
                            'discusiones': req.query.id
                        }
                    })
                    .then((usuario, error) => {
                        if (error) {
                            return resp.json({
                                "status": 500,
                                "messaje": "no se pudo eliminar el registro"
                            })
                        } else {
                            return resp.json({
                                "status": 200,
                                "messaje": "registro eliminado con exito"
                            })

                        }

                    }).catch((error) => {
                        console.log(error);
                        return resp.json({
                            "status": 500,
                            "messaje": 'error en el servidor'
                        })
                    });
            }).catch((error) => {
                console.log(error);
                return resp.json({
                    "status": 500,
                    "messaje": 'error en el servidor'
                })
            });
    }
}

exports.loadListaDiscusionByPregunta = (req, resp, next) => {
    Pregunta.findOne({
            '_id': req.query.id,
            'registroActual': true
        })
        .populate('discusiones')
        .then((preguntas, error) => {
            if (error) {
                resp.json({
                    "status": 500
                })
            } else {
                let listaDiscusiones = [];
                let numeroElementosDiscusiones = preguntas.discusiones.length;
                let contador = 0;
                asyncloop(preguntas.discusiones, (item, next) => {
                    var objetoDiscusion = {
                        titulo: item.titulo,
                        fecha_creacion: item.fecha_creacion,
                        descripcion: item.descripcion,
                        etiquetas: item.etiquetas,
                        numeroComentarios: item.comentarios.length,
                        fecha_cierre: item.fecha_cierre
                    }
                    listaDiscusiones.unshift(objetoDiscusion);
                    next();
                    contador++;
                    if (contador == numeroElementosDiscusiones) {
                        return resp.json({
                            "listaDiscusiones": listaDiscusiones,
                            "status": 200
                        })
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
            return resp.json({
                "status": 500,
                "messaje": error
            })
        });

};

exports.cerrarDiscusionPregunta = (req, resp, next) => {
    var dateClosed = new Date();
    dateClosed = dateClosed.toString()
    discusionPregunta.findByIdAndUpdate({
            "_id": req.query.id
        }, {
            $set: {
                "estados.0.texto": "cerrado",
                "fecha_cierre": dateClosed
            }
        }, {
            "new": true
        })
        .then((discusionPregunta, error) => {
            console.log(discusionPregunta);
            if (error) {
                return resp.json({
                    "status": 500,
                    "messaje": error,
                    "fecha_cierre": ''
                })
            } else {
                return resp.json({
                    "status": 200,
                    "messaje": "actualizado con exito",
                    "fecha_cierre": dateClosed,
                    "estados": "cerrado"
                })
            }

        }).catch((error) => {
            console.log(error);
            return resp.json({
                "status": 500,
                "messaje": error
            })
        });

}

exports.validarPregunta = (req, resp, next) => {
    discusionPregunta.findOne({
            "creador_ID": req.body.respuestaDiscusion.creador_ID,
            "pregunta_ID": req.body.respuestaDiscusion.pregunta_ID,
            $or: [{
                "estados.0.texto": "rechazada"
            }, {
                "estados.0.texto": "aceptada"
            }]
        })
        .then((discusion, error) => {
            console.log(discusion);
            if (error) {
                return resp.json({
                    "status":500,
                    "messaje":"existio un error en la consulta"
                })
            }
            else if (discusion) {
                return resp.json({
                    "status": 304,
                    "messaje": "ya realizo dicha accion"
                })
            } else {
                var discusion = new discusionPregunta(req.body.respuestaDiscusion);
                discusion.save()
                    .then((res) => {
                        Pregunta.findByIdAndUpdate({
                            '_id': req.body.idCuerpoDiscusion
                        }, {
                            $push: {
                                'discusiones': discusion
                            }
                        }, {
                            'new': true,
                            'upsert': true
                        }).then((pregunta, error) => {
                            Usuario.findOne({
                                '_id': pregunta.usuario_ID
                            }).then((usuario) => {
                                correo.sendEmailEstadoPregunta(usuario.correo,
                                    discusion.estados.texto,
                                    pregunta.topicos.texto, discusion.descripcion)
                            }).catch((error) => {
                                return resp.json({
                                    "status": 500,
                                    "error": error
                                })
                            })
                            if (discusion.estados[0].texto == 'aceptada') {
                                console.log('entreeeeeeeeee');
                                var preguntaValidada = {
                                    "identificador": pregunta.identificador,
                                    "descripcion": pregunta.descripcion,
                                    "usuario_ID": pregunta.usuario_ID,
                                    "etiquetas": {
                                        "texto": pregunta.etiquetas.texto
                                    },
                                    "topicos": {
                                        "texto": pregunta.topicos.texto
                                    },
                                    "respuestas": pregunta.respuestas,
                                    "comentarios": pregunta.comentarios
                                }
                                var instanceNuevaPregunta = new preguntasValidas(preguntaValidada);
                                instanceNuevaPregunta.save()
                                    .then((res) => {
                                        console.log(res);
                                        console.log('se guardo como pregunta validada ');
                                    })

                            }
                            return resp.json({
                                "status": 200,
                                "messaje": 'se guardo correctamente la discusion'
                            })
                        }).catch((error) => {
                            console.log(error);
                            return resp.json({
                                "status": 500,
                                "error": error
                            })
                        })
                    }).catch((error) => {
                        console.log(error);
                        return resp.json({
                            "status": 500,
                            "error": error
                        })
                    });

            }
        })
        .catch((error) => {
            console.log(error);
            return resp.json({
                "status": 500,
                "error": error
            })
        })


}