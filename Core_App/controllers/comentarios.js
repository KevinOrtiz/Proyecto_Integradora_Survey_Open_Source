const Comentario = require('../models/Comentarios');
const Pregunta = require('../models/Preguntas');
const Usuario = require('../models/Usuarios');
const correo = require('../correo');
const discusionPregunta = require('../models/discusionesPregutas');
const Encuesta = require('../models/Encuestas')
let asyncloop = require('node-async-loop');


exports.guardarComentario = (req, resp, next) => {
    console.log(req.body.idcategoria)
    var responseComentario = {
        creador: '',
        urlUsuario: '',
        descripcion: req.body.comentario.contenido,
        numeroFavorite: 0,
        numeroLike: 0,
        numeroDislike: 0,
        numeroComentarios: 0,
        idComentario: '',
        idUsuario: ''
    };
    if (req.body.tipo === 'comentario') {
        Usuario.findOne({
                '_id': req.body.comentario.creador.ID
            })
            .then((usuario) => {
                req.body.comentario.creador.nombre = usuario.nombre + usuario.apellido;
                responseComentario.creador = usuario.nombre + usuario.apellido;
                responseComentario.urlUsuario = usuario.urlImage;
                responseComentario.idUsuario = usuario._id;
                var comentario = new Comentario(req.body.comentario);
                console.log(comentario);
                responseComentario.idComentario = comentario._id;
                comentario.save()
                    .then(() => {
                        Comentario.findByIdAndUpdate({
                            '_id': req.body.idCategoria
                        }, {
                            $push: {
                                'listaSubComentarios': comentario
                            }
                        }, {
                            'new': true,
                            'upsert': true
                        }).then((comentario, error) => {
                            if (error) {
                                console.log("HAY UN ERROR EN LA ACTUALIZACION");
                                console.log(error);
                            } else {
                                console.log(comentario);
                                Usuario.findOne({
                                        '_id': comentario.creador.ID
                                    })
                                    .then((usuario) => {
                                        correo.sendComentarioCreado(usuario.correo, req.body.comentario.contenido);
                                    });
                            }
                            return resp.json({
                                'comentarios': responseComentario
                            });
                        }).catch((error) => {
                            console.log(error);
                            return resp.json({
                                'comentarios':null
                            })
                        });
                    }).catch((error) => {
                        console.log(error);
                        return resp.json({
                            'comentarios':null
                        })
                    });

            }).catch((error) => {
                console.log(error);
                return resp.json({
                    'comentarios':null
                })
            });

    } else if (req.body.tipo === 'pregunta') {
        Usuario.findOne({
                '_id': req.body.comentario.creador.ID
            })
            .then((usuario) => {
                req.body.comentario.creador.nombre = usuario.nombre + usuario.apellido;
                responseComentario.creador = usuario.nombre + usuario.apellido;
                responseComentario.urlUsuario = usuario.urlImage;
                var comentario = new Comentario(req.body.comentario);
                responseComentario.idComentario = comentario._id;
                responseComentario.idUsuario = usuario._id;
                comentario.save()
                    .then(() => {
                        Pregunta.findByIdAndUpdate({
                            '_id': req.body.idCategoria
                        }, {
                            $push: {
                                'comentarios': comentario
                            }
                        }, {
                            'new': true,
                            'upsert': true
                        }).then((pregunta, error) => {
                            if (error) {
                                console.log("HAY UN ERROR EN LA ACTUALIZACION");
                                console.log(error);
                            } else {
                                console.log(pregunta);
                                Usuario.findOne({
                                        '_id': pregunta.usuario_ID
                                    })
                                    .then((usuario) => {
                                        correo.sendComentarioCreado(usuario.correo, req.body.comentario.contenido);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                            }
                            return resp.json({
                                'comentarios': responseComentario
                            })
                        }).catch((error) => {
                            console.log(error);
                            return resp.json({
                                'comentarios': null
                            })
                        });
                    }).catch((error) => {
                        console.log(error);
                        return resp.json({
                            'comentarios': null
                        })
                    });

            }).catch((error) => {
                console.log(error);
                return resp.json({
                    'comentarios':null
                })
            });

    } else if (req.body.tipo === 'encuesta'){
        Usuario.findOne({
            '_id': req.body.comentario.creador.ID
        })
        .then((usuario, error) => {
            if (error) {
                console.log('aqui se cayo');
                console.log(error);
                return resp.json({
                    "comentarios":null
                })
            }
            req.body.comentario.creador.nombre = usuario.nombre + usuario.apellido;
            responseComentario.creador = usuario.nombre + usuario.apellido;
            responseComentario.urlUsuario = usuario.urlImage;
            var comentario = new Comentario(req.body.comentario);
            responseComentario.idComentario = comentario._id;
            responseComentario.idUsuario = usuario._id;
            comentario.save()
                      .then(() => {
                          Encuesta.findByIdAndUpdate({
                              '_id': req.body.idCategoria
                          }, {
                              $push: {
                                  'comentarios': comentario
                              }
                          }, {
                              'new':true,
                              'upsert': true
                          }).then((encuesta, error) => {
                              console.log('encuesta');
                              console.log(encuesta);
                              if (error){
                                  console.log(error);
                                  return resp.json({
                                      "status":404,
                                      "comentarios":null
                                  })
                              } else {
                                  Usuario.findOne({
                                      '_id': encuesta.usuario_ID
                                  }).then((usuario) => {
                                      console.log(usuario.correo);
                                      correo.sendComentarioCreadoEncuesta(usuario.correo, req.body.comentario.contenido);

                                  }).catch((error) => {
                                      console.log(error);
                                  })
                              }
                              return resp.json({
                                  "comentarios": responseComentario
                              })
                          }).catch((error) => {
                              console.log('error en un then');
                              console.log(error);
                              return resp.json({
                                  "comentarios":null
                              })
                          })
                      })

        })
        .catch((error) => {
            console.log(error);
            return resp.json({
                "comentarios": null
            })
        })
    }else if (req.body.tipo === 'discusionPregunta') {
        Usuario.findOne({
                '_id': req.body.comentario.creador.ID
            })
            .then((usuario) => {
                req.body.comentario.creador.nombre = usuario.nombre + usuario.apellido;
                responseComentario.creador = usuario.nombre + usuario.apellido;
                responseComentario.urlUsuario = usuario.urlImage;
                var comentario = new Comentario(req.body.comentario);
                responseComentario.idComentario = comentario._id;
                responseComentario.idUsuario = usuario._id;
                comentario.save()
                    .then(() => {
                        discusionPregunta.findByIdAndUpdate({
                            '_id': req.body.idCategoria
                        }, {
                            $push: {
                                'comentarios': comentario
                            }
                        }, {
                            'new': true,
                            'upsert': true
                        }).then((discusionPregunta, error) => {
                            if (error) {
                                console.log("HAY UN ERROR EN LA ACTUALIZACION");
                                console.log(error);
                                return resp.json({
                                    "status": 500,
                                    "comentarios": null
                                })
                            } else {
                                return resp.json({
                                    'comentarios': responseComentario,
                                    "status": 200
                                })
                            }
                        }).catch((error) => {
                            console.log(error);
                            return resp.json({
                                "status": 500,
                                "comentarios": null,
                                "error": error
                            })
                        });
                    }).catch((error) => {
                        console.log(error);
                        return resp.json({
                            "status": 500,
                            "comentarios": null,
                            "error": error
                        })
                    });

            }).catch((error) => {
                console.log(error);
                return resp.json({
                    "status": 500,
                    "comentarios": null,
                    "error": error
                })
            });

    }
}


exports.addPost = (req, resp, next) => {
    console.log(req.body)
    var tipoPost = req.body.comentario.tipo;
    var valor;
    console.log(tipoPost);
    Comentario.findByIdAndUpdate({
            '_id': req.body.comentario.ID
        }, {
            $inc: {
                [tipoPost]: req.body.comentario.Posts
            }
        }, {
            'new': true,
            'upsert': true
        })
        .then((comentario, error) => {
            if (error) {
                console.log("existe un error en la actualizacion");
                console.log(error);
            } else {
                console.log("se actualizo el like");
                console.log(comentario);
                if (tipoPost == 'likes') {
                    valor = comentario.likes;
                } else {
                    valor = comentario.dislikes;
                }
                return resp.json({
                    "status": 200,
                    "messaje": 'se actualizo',
                    'idComentario': comentario._id,
                    'valor': valor
                });
            }
        });
}

exports.addFavoritos = (req, resp, next) => {
    Comentario.findByIdAndUpdate({
            '_id': req.body.comentario.ID
        }, {
            $inc: {
                'favoritos': req.body.comentario.favoritos
            }
        }, {
            'new': true,
            'upsert': true
        })
        .then((comentario, error) => {
            if (error) {
                console.log("existe un error en la actualizacion");
                console.log(error);
            } else {
                console.log("se anadio el favoritos");
                console.log(comentario);
                return resp.json({
                    "status": 200,
                    "messaje": 'se actualizo',
                    'idComentario': comentario._id,
                    'valor': comentario.favoritos
                });

            }
        });
}

exports.loadListaComentario = (req, resp, next) => {
    var skip = req.query.page * 5;
    var listaComentarios;
    console.log(skip);

    if (req.query.tipocategoria === 'pregunta') {
        // primero obtenemos la longitud de los comentarios referente a una pregunta
        const comentarios = [];
        Pregunta.findOne({
                '_id': req.query.idcategoria
            })
            .then((pregunta, error) => {
                if (pregunta.comentarios.length > skip) {
                    Pregunta.findOne({
                            "_id": req.query.idcategoria
                        }, {
                            'comentarios': {
                                $slice: [skip, 5]
                            }
                        })
                        .populate('comentarios')
                        .then((pregunta, error) => {
                            if (error) {
                                console.log("error en la actualizacion ");
                                console.log(error);
                            } else {
                                let contador = 0;
                                let limiteDocumento = pregunta.comentarios.length;
                                asyncloop(pregunta.comentarios, (item, next) => {
                                    Usuario.findOne({
                                            '_id': item.creador.ID
                                        })
                                        .then((usuario, error) => {
                                            var comentario = {
                                                creador: usuario.nombre + usuario.apellido,
                                                urlUsuario: usuario.urlImage,
                                                descripcion: item.contenido,
                                                fecha_creacion: item.fecha_creacion,
                                                numeroFavorite: item.favoritos,
                                                numeroLike: item.likes,
                                                numeroDislike: item.dislikes,
                                                numeroComentarios: item.listaSubComentarios.length,
                                                idComentario: item._id
                                            }
                                            comentarios.unshift(comentario);
                                            next();
                                            contador++;
                                            if (contador === limiteDocumento) {
                                                console.log("*************");
                                                console.log(req.query.page);
                                                console.log("*************");
                                                if (req.query.page == 0) {
                                                    return resp.json({
                                                        "comentarios": comentarios,
                                                        'isDoneComentarios': true
                                                    });
                                                } else {
                                                    return resp.json({
                                                        "comentarios": comentarios,
                                                        'isDoneComentarios': false
                                                    });

                                                }

                                            }


                                        }).catch((error) => {
                                            console.log(error);
                                        });
                                });


                            }
                        }).catch((error) => {
                            console.log(error);
                        });

                } else {
                    Pregunta.findOne({
                            "_id": req.query.idcategoria
                        })
                        .populate('comentarios')
                        .then((pregunta, error) => {
                            if (error) {
                                console.log("error en la actualizacion ");
                                console.log(error);
                            } else {
                                let contador = 0;
                                let limiteDocumento = pregunta.comentarios.length;
                                if (limiteDocumento === 0) {
                                    return resp.json({
                                        "comentarios": null
                                    })
                                } else {
                                    asyncloop(pregunta.comentarios, (item, next) => {
                                        Usuario.findOne({
                                                '_id': item.creador.ID
                                            })
                                            .then((usuario, error) => {
                                                var comentario = {
                                                    creador: usuario.nombre + usuario.apellido,
                                                    urlUsuario: usuario.urlImage,
                                                    descripcion: item.contenido,
                                                    fecha_creacion: item.fecha_creacion,
                                                    numeroFavorite: item.favoritos,
                                                    numeroLike: item.likes,
                                                    numeroDislike: item.dislikes,
                                                    numeroComentarios: item.listaSubComentarios.length,
                                                    idComentario: item._id
                                                }
                                                comentarios.push(comentario);
                                                next();
                                                contador++;
                                                if (contador === limiteDocumento) {
                                                    return resp.json({
                                                        "comentarios": comentarios,
                                                        'isDoneComentarios': true
                                                    });
                                                }


                                            }).catch((error) => {
                                                console.log(error);
                                            });
                                    });
                                }

                            }
                        }).catch((error) => {
                            console.log(error);
                        });

                }
            }).catch((error) => {
                console.log(error);
            });


    }else if (req.query.tipocategoria === 'encuesta'){
        var comentariosEncuesta = [];
        Encuesta.findOne({
            '_id': req.query.idcategoria
        })
        .then((encuesta, error) => {
            if(encuesta.comentarios.length > skip){
                Encuesta.findOne({
                    "_id": req.query.idcategoria
                },{
                    "comentarios":{
                        $slice: [skip, 5]
                    }
                })
                .populate('comentarios')
                .then((encuesta, error) => {
                    if (error) {
                        console.log(error);
                        return resp.json({
                            "comentarios":null,
                            "status":404
                        })
                    }else {
                        let contador = 0;
                        let limiteDocumento = encuesta.comentarios.length;
                        asyncloop(encuesta.comentarios, (item, next) => {
                            Usuario.findOne({
                                "_id": item.creador.ID
                            })
                            .then((usuario, error) => {
                                var comentarios = {
                                        creador: usuario.nombre + usuario.apellido,
                                        urlUsuario: usuario.urlImage,
                                        descripcion: item.contenido,
                                        fecha_creacion: item.fecha_creacion,
                                        numeroFavorite: item.favoritos,
                                        numeroLike: item.likes,
                                        numeroDislike: item.dislikes,
                                        numeroComentarios: item.listaSubComentarios.length,
                                        idComentario: item._id
                                }
                                comentariosEncuesta.unshift(comentarios);
                                next();
                                contador ++;
                                if (contador === limiteDocumento) {
                                    if (req.query.page == 0) {
                                        return resp.json({
                                            "comentarios": comentariosEncuesta,
                                            "isDoneComentarios": true
                                        })
                                    }else {
                                        return resp.json({
                                            "comentarios": comentariosEncuesta,
                                            "isDoneComentarios": false
                                        })
                                    }
                                }
                            }).catch((error) => {
                                console.log(error);
                                return resp.json({
                                    "status":200,
                                    "comentarios":null
                                })
                            })
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return resp.json({
                        "status":500,
                        "comentarios": null
                    })
                })
            } else {
                Encuesta.findOne({
                    "_id": req.query.idcategoria
                })
                .populate('comentarios')
                .then((encuesta, error) => {
                    if (error) {
                        console.log(error);
                        return resp.json({
                            "status":404,
                            "comentarios": null
                        })
                    }else {
                        let contador = 0;
                        let limiteDocumento = encuesta.comentarios.length;
                        if (limiteDocumento === 0) {
                            return resp.json({
                                "comentarios": null
                            })
                        } else {
                            asyncloop(encuesta.comentarios, (item, next) => {
                                Usuario.findOne({
                                    "_id": item.creador.ID
                                })
                                .then((usuario, error) => {
                                    var comentario = {
                                            creador: usuario.nombre + usuario.apellido,
                                            urlUsuario: usuario.urlImage,
                                            descripcion: item.contenido,
                                            fecha_creacion: item.fecha_creacion,
                                            numeroFavorite: item.favoritos,
                                            numeroLike: item.likes,
                                            numeroDislike: item.dislikes,
                                            numeroComentarios: item.listaSubComentarios.length,
                                            idComentario: item._id
                                }
                                comentariosEncuesta.push(comentario);
                                next();
                                contador ++;
                                if (contador === limiteDocumento) {
                                    return resp.json({
                                        "comentarios": comentariosEncuesta,
                                        "isDoneComentarios": true
                                    })
                                }

                                })
                                .catch((error) => {
                                    console.log(error);
                                    return resp.json({
                                        "comentarios": null
                                    })
                                })
                            })
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    return resp.json({
                        "status":500,
                        "comentarios":null
                    })
                })
            }
        })
        .catch((error) => {
            console.log(error);
            return resp.json({
                "status":500,
                "comentarios":null
            })
        })


    }else if (req.query.tipocategoria === 'discusionPregunta') {
        const comentariosDiscusionPreguntas = [];
        discusionPregunta.findOne({
                '_id': req.query.idcategoria
            })
            .then((discusion, error) => {
                if (discusion.comentarios.length > skip) {
                    discusionPregunta.findOne({
                            "_id": req.query.idcategoria
                        }, {
                            'comentarios': {
                                $slice: [skip, 5]
                            }
                        })
                        .populate('comentarios')
                        .then((discusionPregunta, error) => {
                            if (error) {
                                console.log("error en la actualizacion ");
                                console.log(error);
                                return resp.json({
                                    "status": 500,
                                    "comentarios": null
                                })
                            } else {
                                let contadorDiscusionesPregunta = 0;
                                let limiteDocumentoDiscusionesPregunta = discusionPregunta.comentarios.length;
                                asyncloop(discusionPregunta.comentarios, (item, next) => {
                                    Usuario.findOne({
                                            '_id': item.creador.ID
                                        })
                                        .then((usuario, error) => {
                                            var comentario = {
                                                creador: usuario.nombre + usuario.apellido,
                                                urlUsuario: usuario.urlImage,
                                                descripcion: item.contenido,
                                                fecha_creacion: item.fecha_creacion,
                                                numeroFavorite: item.favoritos,
                                                numeroLike: item.likes,
                                                numeroDislike: item.dislikes,
                                                numeroComentarios: item.listaSubComentarios.length,
                                                idComentario: item._id
                                            }
                                            comentariosDiscusionPreguntas.push(comentario);
                                            next();
                                            contadorDiscusionesPregunta++;
                                            if (contadorDiscusionesPregunta === limiteDocumentoDiscusionesPregunta) {
                                                if (req.query.page == 0) {
                                                    return resp.json({
                                                        "comentarios": comentariosDiscusionPreguntas,
                                                        'isDoneComentarios': true,
                                                        "status": 200
                                                    });
                                                } else {
                                                    return resp.json({
                                                        "comentarios": comentariosDiscusionPreguntas,
                                                        'isDoneComentarios': false,
                                                        "status": 200
                                                    });

                                                }

                                            }


                                        }).catch((error) => {
                                            console.log(error);
                                            return resp.json({
                                                "comentarios": null,
                                                "status": 500
                                            })
                                        });
                                });


                            }
                        }).catch((error) => {
                            console.log(error);
                            return resp.json({
                                "comentarios": null,
                                "status": 500
                            })
                        });

                } else {
                    discusionPregunta.findOne({
                            "_id": req.query.idcategoria
                        })
                        .populate('comentarios')
                        .then((discusion, error) => {
                            if (error) {
                                console.log("error en la actualizacion ");
                                console.log(error);
                                return resp.json({
                                    "status": 500,
                                    "comentarios": null
                                })
                            } else {
                                let contadorDiscusion = 0;
                                let limiteDocumento = discusion.comentarios.length;
                                if (limiteDocumento === 0) {
                                    return resp.json({
                                        "comentarios": null,
                                        "status": 200
                                    })
                                } else {
                                    asyncloop(discusion.comentarios, (item, next) => {
                                        Usuario.findOne({
                                                '_id': item.creador.ID
                                            })
                                            .then((usuario, error) => {
                                                var comentario = {
                                                    creador: usuario.nombre + usuario.apellido,
                                                    urlUsuario: usuario.urlImage,
                                                    descripcion: item.contenido,
                                                    fecha_creacion: item.fecha_creacion,
                                                    numeroFavorite: item.favoritos,
                                                    numeroLike: item.likes,
                                                    numeroDislike: item.dislikes,
                                                    numeroComentarios: item.listaSubComentarios.length,
                                                    idComentario: item._id
                                                }
                                                comentariosDiscusionPreguntas.push(comentario);
                                                next();
                                                contadorDiscusion++;
                                                if (contadorDiscusion === limiteDocumento) {
                                                    return resp.json({
                                                        "comentarios": comentariosDiscusionPreguntas,
                                                        'isDoneComentarios': true
                                                    });
                                                }


                                            }).catch((error) => {
                                                console.log(error);
                                            });
                                    });
                                }

                            }
                        }).catch((error) => {
                            console.log(error);
                        });

                }
            }).catch((error) => {
                console.log(error);
            });

    } else if (req.query.tipocategoria === 'comentario') {
        const Arraycomentarios = []
        Comentario.findOne({
                "_id": req.query.idcategoria
            })
            .populate('listaSubComentarios')
            .then((comentarios, error) => {
                if (error) {
                    console.log("error en la actualizacion ");
                    console.log(error);
                } else {
                    let contador = 0;
                    let limiteDocumento = comentarios.listaSubComentarios.length;
                    if (limiteDocumento == 0) {
                        return resp.json({
                            "comentarios": null
                        });
                    }
                    asyncloop(comentarios.listaSubComentarios, (item, next) => {
                        Usuario.findOne({
                                '_id': item.creador.ID
                            })
                            .then((usuario, error) => {
                                var comentario = {
                                    creador: usuario.nombre + usuario.apellido,
                                    urlUsuario: usuario.urlImage,
                                    descripcion: item.contenido,
                                    fecha_creacion: item.fecha_creacion,
                                    numeroFavorite: item.favoritos,
                                    numeroLike: item.likes,
                                    numeroDislike: item.dislikes,
                                    idComentario: item._id
                                }
                                Arraycomentarios.push(comentario);
                                next();
                                contador++;
                                if (contador === limiteDocumento) {
                                    return resp.json({
                                        "comentarios": Arraycomentarios
                                    });
                                }


                            }).catch((error) => {
                                console.log(error);
                            });
                    });


                }
            }).catch((error) => {
                console.log(error);
            });

    }
}