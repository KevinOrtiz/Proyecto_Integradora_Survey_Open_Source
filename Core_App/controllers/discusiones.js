const Pregunta = require('../models/Preguntas');
const Encuesta = require('../models/Encuestas');
const Usuario = require('../models/Usuarios');
const discusionPregunta = require('../models/discusionesPregutas');
const discusionEncuesta = require('../models/discusionesEncuestas');
const correo = require('../correo');
const preguntasValidas = require('../models/preguntasValidadas');
let asyncloop = require('node-async-loop');

exports.guardarDiscusion = (req, resp, next) => {
    let idUsuario = '';
    if (req.body.tipoDiscusion === 'pregunta') {
        let objetoPregunta = new discusionPregunta(req.body.respuestaDiscusion);
        objetoPregunta.save()
            .then((res) => {
                console.log(res);
                Pregunta.findByIdAndUpdate({
                    '_id': req.body.idCuerpoDiscusion,
                    "registroActual": true
                }, {
                    $push: {
                        'discusiones': objetoPregunta
                    }
                }, {
                    'new': true,
                    'upsert': true
                }).then((pregunta, error) => {
                    Usuario.findOne({
                        '_id': pregunta.usuario_ID
                    }).then((usuario, error) => {
                        idUsuario = pregunta.usuario_ID;
                        correo.sendCorreoDiscusionCreada(usuario.correo, usuario.nombre, req.body.respuestaDiscusion.titulo);
                    });
                    if (error) {
                        console.log(error);
                        return resp.json({
                            "status": 500
                        });
                    } else {
                        return resp.json({
                            "status": 200,
                            "idUsuario": idUsuario
                        });
                    }
                });
            }).catch((error) => {
                console.log('error');
                console.log(error);
                return resp.json({
                    "status": 500
                })
            });
    }else if (req.body.tipoDiscusion === 'encuesta'){
        let objetodiscusionEncuesta = {
            titulo: req.body.respuestaDiscusion.titulo,
            descripcion: req.body.respuestaDiscusion.descripcion,
            etiquetas: req.body.respuestaDiscusion.etiquetas,
            creador_ID: req.body.respuestaDiscusion.creador_ID,
            estado: req.body.respuestaDiscusion.estados[0].texto,
            fecha_creacion: req.body.respuestaDiscusion.fecha_creacion,
            fecha_cierre: req.body.respuestaDiscusion.fecha_cierre,
            encuesta_ID: req.body.respuestaDiscusion.pregunta_ID
        };
        let objetoEncuesta = new discusionEncuesta(objetodiscusionEncuesta);
        objetoEncuesta.save()
            .then((res) => {
                Encuesta.findByIdAndUpdate({
                    '_id': req.body.idCuerpoDiscusion,
                    'registroActual':true
                },{
                    $push:{
                        'discusiones':objetoEncuesta
                    }
                },{
                    'new':true,
                    'upsert':true
                }).then((encuesta, error) => {
                    Usuario.findOne({
                        '_id': encuesta.usuario_ID
                    }).then((usuario, error) => {
                        idUsuario = encuesta.usuario_ID;
                        correo.sendCorreoDiscusionCreada(usuario.correo, usuario.nombre, req.body.respuestaDiscusion.titulo);
                    });
                    if (error){
                        console.log(error);
                        return resp.json({
                            "status":500
                        })
                    }else {
                        return resp.json({
                            "status": 200,
                            "idUsuario": idUsuario
                        });
                    }
                });

            }).catch((error) => {
                console.log(error);
            return resp.json({
                "status":500
            })
        });

    }
};

exports.loadListaDiscusiones = (req, resp, next) => {
    if (req.query.tipoDiscusion === 'pregunta') {
        const listaDiscusiones = [];
        Pregunta.findOne({
                "_id": req.query.idcuerpodiscusion,
                "registroActual":true
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
                                let discusion = {
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
                                };
                                listaDiscusiones.unshift(discusion);
                                next();
                                contador++;
                                if (contador === totalDocumento) {
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
    }else if(req.query.tipoDiscusion === 'encuesta'){
        let listaDiscusionEncuesta = [];
        Encuesta.findOne({
            "_id": req.query.idcuerpodiscusion,
            "registroActual":true
        })
            .populate('discusiones')
            .then((encuesta, error) => {
                if (error) {
                    console.log(error);
                    return resp.json({
                        "status": 500,
                        "messaje": "ha existido en el error de la consulta",
                        "discusiones": null
                    })
                } else {
                    let contador = 0;
                    let totalDocumento = encuesta.discusiones.length;
                    asyncloop(encuesta.discusiones, (item, next) => {
                        Usuario.findOne({
                            '_id': item.creador_ID
                        })
                            .then((usuario, error) => {
                                let discusion = {
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
                                    estados: item.estado
                                };
                                listaDiscusionEncuesta.unshift(discusion);
                                next();
                                contador++;
                                if (contador === totalDocumento) {
                                    return resp.json({
                                        'discusiones': listaDiscusionEncuesta,
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
};

exports.loadListaMisDiscusiones = (req, resp, next) => {
    if (req.query.tipoDiscusion === 'pregunta') {
        discusionPregunta.paginate({
                'etiquetas': new RegExp(req.query.topico, 'i'),
                'creador_ID': req.query.id,
            },{
                page: req.query.page,
                limit: 5,
                sort:{fecha_creacion: -1}
            })
            .then((discusion, error) => {
                if (error) {
                    return resp.json({
                        "status": 500,
                        "messaje": 'error en la obtencion de datos del usuario'
                    })
                } else {
                    let listaDiscusion = [];
                    let numeroElementosDiscusion = discusion.docs.length;
                    let contador = 0;
                    asyncloop(discusion.docs, (item, next) => {
                         let objectDiscusionPregunta = {
                            _id: item._id,
                            titulo: item.titulo,
                            etiquetas: item.etiquetas,
                            fecha_creacion: item.fecha_creacion,
                            fecha_cierre: item.fecha_cierre,
                             estados: item.estados[0].texto,
                            pregunta_ID: item.pregunta_ID
                        };
                        listaDiscusion.push(objectDiscusionPregunta);
                        next();
                        contador++;
                        console.log(listaDiscusion);
                        if (contador === numeroElementosDiscusion) {
                            return resp.json({
                                "listadiscusionPregunta": listaDiscusion,
                                "status": 200,
                                "pages":discusion.pages
                            })
                        }
                    });
                }
            }).catch((error) => {
                console.log(error);
                return resp.json({"status":500, "pages":0})
            });
    }else if (req.query.tipoDiscusion === 'encuesta'){
        discusionEncuesta.paginate({
            'etiquetas': new RegExp(req.query.topico, 'i'),
            'creador_ID':req.query.id
        },{
            page: req.query.page,
            limit: 5,
            sort: {fecha_creacion: -1}
        }).then((respuesta, error) => {
            if (error){
                return resp.json({
                    "status":500,
                    "messaje": 'error en la obtencion de datos del usuario'
                })
            }else {
                let listaDiscusionEncuesta = [];
                let numeroElementos = respuesta.docs.length;
                let contador = 0;
                asyncloop(respuesta.docs, (item, next) => {
                    let objectDiscusionEncuesta = {
                        _id: item._id,
                        titulo: item.titulo,
                        etiquetas: item.etiquetas,
                        fecha_creacion: item.fecha_creacion,
                        fecha_cierre: item.fecha_cierre,
                        estado:item.estado,
                        encuesta_ID: item.encuesta_ID
                    };
                    listaDiscusionEncuesta.push(objectDiscusionEncuesta);
                    next();
                    contador++;
                    if (contador === numeroElementos) {
                        return resp.json({
                            "listadiscusionEncuesta": listaDiscusionEncuesta,
                            "status": 200,
                            "pages":respuesta.pages
                        })
                    }
                });

            }

        }).catch((error) => {
            console.log(error);
            return resp.json({"status":500, "pages":0})
        })
    }
};


exports.loadMyDiscusion = (req, resp, next) => {
    if (req.query.tipoDiscusion === 'pregunta') {
        discusionPregunta.findOne({
                '_id': req.query.id
            })
            .then((discusion, error) => {
                if (error) {
                    console.log(error);
                    return resp.json({"status":500})
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
                console.log("error en la consulta de discusion de Pregunta");
                console.log(error);
                return resp.json({
                    "status":500
                })
            });
    } else if (req.query.tipoDiscusion === 'encuesta'){
        discusionEncuesta.findOne({
            '_id':req.query.id
        }).then((discusion, error) => {
            if (error){
                return resp.json({
                    "status":500
                })
            }else {
                return resp.json({
                    "status":200,
                    "discusion":{
                        titulo: discusion.titulo,
                        fecha_creacion: discusion.fecha_creacion,
                        descripcion: discusion.descripcion,
                        etiquetas: discusion.etiquetas,
                        numeroComentarios: discusion.comentarios.length,
                        encuesta_ID: discusion.encuesta_ID,
                        fecha_cierre: discusion.fecha_cierre,
                        estados: discusion.estado
                    }
                })
            }

        }).catch((error)=> {
            console.log(error);
            return resp.json({
                "status":500
            })
        })

    }
};

exports.editMyDiscusion = (req, resp, next) => {
    if (req.body.tipoDiscusion === 'pregunta') {
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
                return resp.json({
                    "status":500
                })
            });
    }else if (req.body.tipoDiscusion === 'encuesta'){
        discusionEncuesta.findOneAndUpdate({
            '_id': req.body.id
        }, req.body.respuestaDiscusion, {
            upsert: true,
            new: true
        })
            .then((resultado, error) => {
                return resp.json({
                    "status": 200,
                    "discusionActualizada": resultado
                })
            }).catch((error) => {
            return resp.json({
                "status":500
            })
        });
    }
};


exports.removeMyDiscusion = (req, resp, next) => {
    if (req.query.tipoDiscusion === 'pregunta') {
        discusionPregunta.findByIdAndRemove({
                '_id': req.query.id
            })
            .then((discusion, error) => {
                console.log(discusion);
                Pregunta.findByIdAndUpdate({
                        '_id': req.query.pregunta_ID,
                        'registroActual':true
                    }, {
                        $pull: {
                            'discusiones': req.query.id
                        }
                    })
                    .then((pregunta, error) => {
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
    } else if (req.query.tipoDiscusion === 'encuesta'){
        discusionEncuesta.findByIdAndRemove({
            "_id":req.query.id
        }).then((discusion, error) => {
            console.log(discusion);
            Encuesta.findByIdAndUpdate({
                "_id":req.query.encuesta_ID,
                "registroActual":true
            },{
                $pull:{
                    'discusiones':req.query.id
                }
            }).then((resultado, error)=>{
                if (error){
                    return resp.json({
                        "status":500
                    })

                }else{
                    return resp.json({
                        "status":200
                    })
                }
            }).catch((error)=>{
                console.log(error);
                return resp.json({
                    "status":500
                })
            })

        }).catch((error)=> {
            console.log(error);
            return resp.json({
                "status":500,
                "messaje": "error en el servidor"
            })

        })


    }
};

exports.loadListaDiscusionByPregunta = (req, resp, next) => {
    Pregunta.findOne({
            '_id': req.query.id,
            'registroActual': true
        })
        .populate('discusiones')
        .then((preguntas, error) => {
            if (error) {
               return  resp.json({
                    "status": 500
                })
            } else {
                let listaDiscusiones = [];
                let numeroElementosDiscusiones = preguntas.discusiones.length;
                let contador = 0;
                asyncloop(preguntas.discusiones, (item, next) => {
                    Usuario.findOne({
                        '_id': item.creador_ID
                    }).then((usuario, error) => {
                        let objetoDiscusion = {
                            titulo: item.titulo,
                            estado: item.estados[0].texto,
                            fecha_creacion: item.fecha_creacion,
                            descripcion: item.descripcion,
                            etiquetas: item.etiquetas,
                            numeroComentarios: item.comentarios.length,
                            fecha_cierre: item.fecha_cierre,
                            nombre: usuario.nombre,
                            apellido: usuario.apellido,
                            urlImage: usuario.urlImage
                        };
                        listaDiscusiones.unshift(objetoDiscusion);
                        next();
                        contador++;
                        if (contador === numeroElementosDiscusiones) {
                            return resp.json({
                                "listaDiscusiones": listaDiscusiones,
                                "status": 200
                            })
                        }

                    }).catch((error)=> {
                        console.log(error);
                       return resp.json({
                           "status": 500,
                           "listaDiscusiones":null
                       })
                    });

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
    let dateClosed = new Date();
    dateClosed = dateClosed.toString();
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
                    "idUsuario": discusionPregunta.creador_ID,
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

};

exports.cerrarDiscusionEncuesta = (req, res, next)=> {
    let dateClosed = new Date();
    dateClosed = dateClosed.toString();
    discusionEncuesta.findByIdAndUpdate({
        "_id": req.query.id
    }, {
        $set: {
            "estado": "cerrado",
            "fecha_cierre": dateClosed
        }
    }, {
        "new": true
    })
        .then((respuesta, error) => {
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
                    "idUsuario": respuesta.creador_ID,
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
};

exports.actualizarEstadoDiscusionEncuesta = (req, resp, next)=>{
    discusionEncuesta.findByIdAndUpdate({
        "_id":req.query.id
    },{
        $set:{
            "estado":req.query.estado
        }
    },{
        "new":true
    }).then((resultado,error)=>{
        if(error){
            return resp.json({
                "status":500,
                "messaje":error
            })
        }else {
            return resp.json({
                "status":200,
                "messaje": 'actualizado con exito',
                "idUsuario":resultado.creador_ID
            })

        }
    }).catch((error)=>{
        return resp.json({
            "status":500,
            "messaje":error
        })
    })
};

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
                            },
                            $set: {
                                'estado': discusion.estados[0].texto
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
                                var preguntaValidada = {
                                    "descripcion": pregunta.descripcion,
                                    "usuario_ID": pregunta.usuario_ID,
                                    "etiquetas": {
                                        "texto": pregunta.etiquetas.texto
                                    },
                                    "listaImagen":[{
                                        "url": pregunta.listaImagen[0].url
                                    }],
                                    "topicos": {
                                        "texto": pregunta.topicos.texto
                                    },
                                    "respuestas": pregunta.respuestas,
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
                                "messaje": 'se guardo correctamente la discusion',
                                "idUsuario":req.body.respuestaDiscusion.creador_ID
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