'use strict';
let encuesta = require('../models/Encuestas');
let preguntasValidas = require('../models/preguntasValidadas');
let asyncloop = require('node-async-loop');
let usuario = require('../models/Usuarios');
let colaborador = require('../models/Colaboradores');
let correo = require('../correo');

exports.getListaPreguntasValidas = (req, resp, next) => {
    console.log('entre');
    var listapreguntasValidas = [];
    preguntasValidas.paginate({}, {
        page: req.query.page,
        limit: 5,
        sort: { fecha_creacion: -1 }
    })
        .then((result, err) => {
            if (err) {
                return resp.json({
                    "status": 404,
                    "messaje": "no existen mas datos",
                    "listaPreguntas": []
                });
            }
            else {
                let contador = 0;
                let limiteDocumento = result.docs.length;
                asyncloop(result.docs, (item, next) => {
                    var preguntasValidas = {
                        _id: item._id,
                        url: item.listaImagen[0].url,
                        topicos: item.topicos.texto,
                        fecha_creacion: item.fecha_creacion,
                        descripcion: item.descripcion,
                        respuestas: item.respuestas
                    }
                    listapreguntasValidas.push(preguntasValidas);
                    next();
                    contador++;
                    if (contador === limiteDocumento) {
                        console.log('todo salio bien');
                        return resp.json({
                            "listaPreguntas": listapreguntasValidas,
                            "status": 200,
                            "paginas": result.pages
                        })
                    }
                })

            }
        })
        .catch((error) => {
            console.log("error en la consulta de extraccion de preguntas validas");
            console.log(error);
            return resp.json({
                "status": 500,
                "listaPreguntas": []
            })

        })
}

exports.guardarEncuesta = (req, res, next) => {
    var preguntas = [];
    var contador = 0;
    let limiteDocumento = req.body.encuesta.preguntas.length;
    asyncloop(req.body.encuesta.preguntas, (item, next) => {
        preguntas.push(item._id);
        next();
        contador++;
        if (contador === limiteDocumento) {
            req.body.encuesta.preguntas = preguntas;
            let nuevaEncuesta = new encuesta(req.body.encuesta);
            nuevaEncuesta.save((error) => {
                if (error) {
                    console.log(error);
                    return res.json({
                        "status": 404,
                        "messaje": 'no se pudo guardar la encuesta'
                    })
                }
                else {
                    return res.json({
                        "status": 200,
                        "messaje": 'la encuesta se guardo de manera exitosa'
                    })
                }

            })
        }
    })

}

exports.cargarEncuesta = (req, res, next) => {
    encuesta.findOne({
        _id: req.query.id,
        registroActual: true
    })
        .populate('preguntas')
        .then((response, err) => {
            if (err) {
                console.log(err);
                return res.json({
                    "status": 404,
                    "encuesta": null
                })
            }
            else {
                usuario.findOne({
                    _id: response.usuario_ID
                }).then((responseUsuario, err) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            "status": 404,
                            "encuesta": null
                        })
                    }
                    else {
                        var encuestaObject = {
                            usuario: {
                                url: responseUsuario.urlImage,
                                nombre: responseUsuario.nombre + responseUsuario.apellido,
                            },
                            fecha_creacion: response.fecha_creacion,
                            titulo: response.titulo,
                            etiqueta: response.etiqueta,
                            descripcion: response.descripcion,
                            preguntas: response.preguntas,
                            contenidoMultimedia: {
                                url: response.contenido_multimedia.url
                            }
                        }
                        return res.json({
                            "status": 200,
                            "encuesta": encuestaObject
                        })
                    }
                })
                    .catch((error) => {
                        console.log(error);
                        return res.json({
                            "status": 500,
                            "encuesta": null
                        })
                    })
            }
        }).catch((error) => {
            return res.json({
                "status": 500,
                "encuesta": null
            })
        })
}

exports.loadListaMyEncuestas = (req, res, next) => {
    console.log('entre aqui');
    var listaMyEncuestas = []
    encuesta.paginate({
        "etiqueta.texto": new RegExp(req.query.topico, 'i'),
        "usuario_ID": req.query.id,
        "registroActual": true
    }, {
            page: req.query.page,
            limit: 5,
            sort: { fecha_creacion: -1 }
        }).then((result, error) => {
            if (error) {
                console.log('existio un error a cargar mis encuestas');
                console.log(error);
                return res.json({
                    "status": 404,
                    "listaMyEncuestas": null
                })
            } else {
                let contador = 0;
                let limiteDocumento = result.docs.length;
                if (limiteDocumento > 0) {
                    asyncloop(result.docs, (item, next) => {
                        var encuesta = {
                            titulo: item.titulo,
                            descripcion: item.descripcion,
                            id: item._id,
                            fecha_creacion: item.fecha_creacion,
                            numeroPreguntas: item.preguntas.length,
                            logo: item.contenido_multimedia.url,
                            labels: item.etiqueta
                        };
                        listaMyEncuestas.push(encuesta)
                        next();
                        contador++;
                        if (contador === limiteDocumento) {
                            console.log(listaMyEncuestas);
                            return res.json({
                                "status": 200,
                                "listaMyEncuestas": listaMyEncuestas,
                                "paginas": result.pages
                            })
                        }

                    })

                } else {
                    return res.json({
                        "status": 200,
                        "listaMyEncuestas": null,
                        "paginas": 0
                    })
                }

            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaMyEncuestas": null,
                "paginas": 0

            })
        })
}

exports.queryEncuestas = (req, res, next) => {
    var encuestas = [];
    encuesta.paginate({
        "etiqueta.texto": new RegExp(req.query.topico, 'i'),
        "registroActual": true
    }, {
            page: req.query.page,
            limit: 5,
            sort: { fecha_creacion: -1 }
        })
        .then((result, err) => {
            if (err) {
                console.log(err);
                return res.json({
                    "status": 404,
                    "messajes": 'no hay mas elementos para cargar',
                    "listaEncuestas": null
                })
            }
            let contador = 0;
            let limiteDocumento = result.docs.length;
            if (limiteDocumento > 0) {

                asyncloop(result.docs, (item, next) => {
                    usuario.findOne({
                        _id: item.usuario_ID
                    })
                        .then((usuario, err) => {
                            console.log(item);
                            if (err) {
                                return res.json({
                                    "status": 404,
                                    "messaje": 'error en la consulta de usuario',
                                    "listaEncuestas": null
                                })
                            }
                            else {
                                var encuesta = {
                                    _id: item._id,
                                    urlUsuario: usuario.urlImage,
                                    idUsuario: item.usuario_ID,
                                    usuario: usuario.nombre + usuario.apellido,
                                    fecha_creacion: item.fecha_creacion,
                                    titulo: item.titulo,
                                    etiqueta: item.etiqueta,
                                    descripcion: item.descripcion,
                                    numeroPreguntas: item.preguntas.length,
                                    numeroDiscusiones: item.discusiones.length,
                                    numeroComentarios: item.comentarios.length,
                                    contenidoMultimedia: {
                                        url: item.contenido_multimedia.url
                                    }
                                }
                                encuestas.push(encuesta);
                                next();
                                contador++;
                                if (contador === limiteDocumento) {
                                    return res.json({
                                        "listaEncuestas": encuestas,
                                        "status": 200,
                                        "longitud": limiteDocumento,
                                        "paginas": result.pages
                                    });
                                }

                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            return res.json({
                                "status": 500,
                                "listaEncuestas": null
                            })
                        })
                })

            } else {
                return res.json({
                    "status": 200,
                    "listaEncuesta": null
                })

            }
        })
}

exports.loadListaEncuestas = (req, res, next) => {
    let encuestas = [];
    encuesta.paginate({
        registroActual: true
    }, {
            page: req.query.page,
            limit: 5,
            sort: { fecha_creacion: -1 }
        })
        .then((result, err) => {
            if (err) {
                console.log(err);
                return res.json({
                    "status": 404,
                    "listaEncuestas": null
                })
            } else {
                let contador = 0;
                let limiteDocumento = result.docs.length;
                asyncloop(result.docs, (item, next) => {
                    usuario.findOne({
                        _id: item.usuario_ID
                    })
                        .then((usuario) => {
                            var encuesta = {
                                _id: item._id,
                                urlUsuario: usuario.urlImage,
                                usuario: usuario.nombre + usuario.apellido,
                                fecha_creacion: item.fecha_creacion,
                                titulo: item.titulo,
                                etiqueta: item.etiqueta,
                                descripcion: item.descripcion,
                                numeroPreguntas: item.preguntas.length,
                                numeroDiscusiones: item.discusiones.length,
                                numeroComentarios: item.comentarios.length
                            }
                            encuestas.push(encuesta);
                            next();
                            contador++;
                            if (contador === limiteDocumento) {
                                return res.json({
                                    "listaEncuestas": encuestas,
                                    "status": 200,
                                    "longitud": limiteDocumento,
                                    "paginas": result.pages
                                });
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            return res.json({
                                "status": 500,
                                "listaEncuestas": null
                            })
                        })
                })
            }
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaEncuestas": null
            })
        })
}

exports.deleteAllMyEncuestas = (req, res, next) => {
    encuesta.remove({
        'usuario_ID': req.query.usuario_ID,
        'registroActual': true
    }).then((encuesta, error) => {
        console.log(encuesta);
        if (error) {
            console.log(error);
            return res.json({
                "status": 404,
                "eliminado": false
            })
        } else {
            return res.json({
                "status": 200,
                "eliminado": true
            })
        }

    }).catch((error) => {
        console.log(error);
        return res.json({
            "status": 500,
            "eliminado": false
        })

    })
};

exports.deleteEncuestaByID = (req, res, next) => {
    encuesta.findByIdAndRemove(req.query.id)
        .then((result, error) => {
            if (error) {
                console.log('existio un error al eliminar la encuesta by id')
                return res.json({
                    "status": 404,
                    "eliminado": false,
                    "result": null
                })
            }
            return res.json({
                "status": 200,
                "eliminado": true,
                "result": result
            })

        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "eliminado": false,
                "result": null
            })
        })

}

exports.loadListadoDiscusionesByEncuesta = (req, res, next) => {
    let listadoDiscusionesByEncuesta = [];
    encuesta.findOne({
        "_id": req.query.id,
        "registroActual": true
    }).populate('discusiones')
        .then((encuesta, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 200,
                    "listaDiscusiones": null
                })
            }
            let contador = 0;
            let totalRegistros = encuesta.discusiones.length;
            if (totalRegistros > 0) {

                asyncloop(encuesta.discusiones, (item, next) => {
                    usuario.findOne({
                        "_id": item.creador_ID
                    }).then((usuario, error) => {
                        var discusion = {
                            '_id': item._id,
                            'titulo': item.titulo,
                            'descripcion': item.descripcion,
                            'etiquetas': item.etiquetas,
                            'estado': item.estado,
                            'fecha_creacion': item.fecha_creacion,
                            'fecha_cierre': item.fecha_cierre,
                            'numeroComentarios': item.comentarios.length,
                            'nombre': usuario.nombre,
                            'apellido': usuario.apellido,
                            'urlImage': usuario.urlImage
                        };
                        listadoDiscusionesByEncuesta.unshift(discusion);
                        contador++;
                        next();
                        if (contador === totalRegistros) {
                            return res.json({
                                "status": 200,
                                "listaDiscusiones": listadoDiscusionesByEncuesta
                            })
                        }


                    }).catch((error) => {
                        console.log(error);
                        return res.json({
                            "status": 500,
                            "listaDiscusiones": null
                        })
                    })
                })

            }
            else {
                return res.json({
                    "status": 200,
                    "listaDiscusiones": null
                })

            }
        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaDiscusiones": null
            })
        })

}

exports.updateMyEncuesta = (req, res, next) => {
    encuesta.findByIdAndUpdate(req.body._id, req.body.encuesta, { new: true, upsert: true })
        .then((encuesta, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "encuesta": null
                })
            } else {
                return res.json({
                    "status": 200,
                    "encuesta": encuesta
                })
            }

        })
        .catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "encuesta": null
            })
        })
}

exports.loadUsuarios = (req, res, next) => {
    usuario.paginate({
        'nombre': new RegExp(req.query.nombre, 'i'),
        '_id': { $ne: req.query.usuario_ID }
    }, {
            page: req.query.page,
            limit: 5
        })
        .then((result, error) => {
            if (error) {
                return res.json({
                    'status': 404,
                    'listaUsuarios': null
                })
            } else {
                return res.json({
                    'status': 200,
                    'listaUsuarios': result.docs
                })
            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                'status': 500,
                'listaUsuarios': null
            })
        })
}

exports.loadListaMisColaboradores = (req, res, next) => {
    var listaColaboradores = [];
    encuesta.findOne({
        '_id': req.query.idEncuesta
    })
        .populate({
            path: 'colaboradores',
            populate: {
                path: 'usuarioColaborador',
                model: 'usuario'
            }
        })
        .then((encuesta, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    'status': 404,
                    'listaMisColaboradores': null
                })
            } else if (encuesta.colaboradores.length > 0) {
                let contador = 0;
                let limiteDocumento = encuesta.colaboradores.length;
                asyncloop(encuesta.colaboradores, (item, next) => {
                    var colaborador = {
                        'nombre': item.usuarioColaborador.nombre,
                        'apellido': item.usuarioColaborador.apellido,
                        'correo': item.usuarioColaborador.correo,
                        'urlImage': item.usuarioColaborador.urlImage,
                        'rol': item.rol,
                        '_id': item._id,
                        'idColaborador': item.usuarioColaborador._id
                    };
                    listaColaboradores.push(colaborador);
                    next();
                    contador++;
                    if (contador === limiteDocumento) {
                        return res.json({
                            'status': 200,
                            'listaMisColaboradores': listaColaboradores
                        })
                    }

                })

            } else {
                return res.json({
                    'status': 200,
                    'listaMisColaboradores': null
                })
            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                'status': 500,
                'listaMisColaboradores': null
            })
        })
}

exports.addColaborador = (req, res, next) => {
    var existe = false;
    encuesta.findOne({
        '_id': req.body.colaborador.idEncuesta
    })
        .populate('colaboradores')
        .then((result, error) => {
            if (result.colaboradores.length > 0) {
                asyncloop(result.colaboradores, (item, next) => {
                    next()
                    if (item.usuarioColaborador == req.body.colaborador.idColaborador) {
                        existe = true;
                        return res.json({
                            'status': 304,
                            'encuesta': null
                        })
                    }
                })
            } else if (existe == false) {
                let instanceColaborador = new colaborador;
                instanceColaborador.rol = req.body.colaborador.rol;
                instanceColaborador.usuarioColaborador = req.body.colaborador.idColaborador;
                instanceColaborador.encuestaCompartida = req.body.colaborador.idEncuesta;
                instanceColaborador.save((error) => {
                    if (error) {
                        console.log(error);
                        return res.json({
                            'status': 500,
                            'encuesta': null
                        })
                    } else {
                        encuesta.findByIdAndUpdate(req.body.colaborador.idEncuesta, {
                            $push: { 'colaboradores': instanceColaborador._id }
                        }).then((encuesta, error) => {
                            usuario.findByIdAndUpdate(req.body.colaborador.usuario_encuesta, {
                                $push: { 'colaboradores': instanceColaborador._id }
                            }).then((usuario, error) => {
                                if (error) {
                                    console.log(error);
                                    return res.json({
                                        'status': 500,
                                        'encuesta': null
                                    })
                                } else {
                                    colaborador.findById(instanceColaborador._id)
                                        .populate('usuarioColaborador')
                                        .then((usuario_colaborador, error) => {
                                            var usuario_instance = {
                                                'nombre': usuario_colaborador.usuarioColaborador.nombre,
                                                'apellido': usuario_colaborador.usuarioColaborador.apellido,
                                                'correo': usuario_colaborador.usuarioColaborador.correo,
                                                'rol': usuario_colaborador.rol,
                                                '_id': usuario_colaborador._id,
                                                'urlImage': usuario_colaborador.usuarioColaborador.urlImage,
                                                'idColaborador': usuario_colaborador.usuarioColaborador.idColaborador
                                            }
                                            correo.sendCorreoAddColaborador(usuario.nombre, encuesta.titulo, usuario_colaborador.usuarioColaborador.correo, usuario_colaborador.rol, usuario_colaborador.usuarioColaborador.nombre);

                                            return res.json({
                                                'status': 200,
                                                'encuesta': usuario_instance
                                            })

                                        }).catch((error) => {
                                            console.log(error);
                                            return res.json({
                                                'status': 500,
                                                'encuesta': null
                                            })
                                        })

                                }
                            }).catch((error) => {
                                console.log(error);
                                return res.json({
                                    'status': 500,
                                    'encuesta': null
                                })
                            })
                        }).catch((error) => {
                            console.log(error);
                            return res.json({
                                'status': 500,
                                'encuesta': null
                            })
                        })
                    }
                })

            }



        })
}


exports.updateRolColaboradorEncuesta = (req, res, next) => {
    console.log(req.body);
    colaborador.findOne({
        '_id': req.body.colaborador.id
    })
        .then((result, error) => {
            console.log(result);
            if (error) {
                console.log(error);

            } else {
                if (result.rol === req.body.colaborador.rol) {
                    return res.json({
                        'status': 304
                    })
                } else {
                    colaborador.findByIdAndUpdate(req.body.colaborador.id, {
                        $set: {
                            'rol': req.body.colaborador.rol
                        }
                    })
                        .populate('usuarioColaborador')
                        .populate('encuestaCompartida')
                        .then((resultado, error) => {
                            if (error) {
                                return res.json({
                                    'status': 500
                                })
                            } else {
                                usuario.findById(req.body.colaborador.usuario_encuesta)
                                    .then((instance_usuario, error) => {
                                        console.log(instance_usuario);
                                        if (error) {
                                            console.log(error);
                                        }
                                        correo.actualizacionRolColaborador(instance_usuario.nombre, resultado.usuarioColaborador.correo, req.body.colaborador.rol, resultado.usuarioColaborador.nombre);
                                        return res.json({
                                            'status': 200
                                        })

                                    }).catch((error_usuario) => {
                                        console.log(error_usuario);
                                        return res.json({
                                            'status': 500
                                        });
                                    });


                            }

                        }).catch((error) => {
                            console.log(error);
                            return res.json({
                                'status': 500
                            })
                        })

                }
            }
        }).catch((error) => {
            console.log(error);
            return res.json({
                'status': 500
            })
        })

};

exports.deleteColaboradorEncuesta = (req, res, next) => {
    colaborador.findById(req.query.id)
        .populate('usuarioColaborador')
        .populate('encuestaCompartida')
        .then((resultado_colaborador, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    'status': 500
                })
            } else {
                usuario.findById(req.query.usuario_ID)
                    .then((resultado, error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            correo.eliminacionColaborador(resultado.nombre, resultado_colaborador.usuarioColaborador.correo, resultado_colaborador.usuarioColaborador.nombre, resultado_colaborador.encuestaCompartida.titulo);
                        }
                    });

                colaborador.findByIdAndRemove(req.query.id)
                    .then((result, error) => {
                        if (error) {
                            return res.json({
                                'status': 500
                            })
                        } else {
                            usuario.findByIdAndUpdate(req.query.usuario_ID, {
                                $pull: {
                                    'colaboradores': req.query.id
                                }
                            }).then((objeto, error) => {
                                if (error) {
                                    return res.json({
                                        'status': 500
                                    })
                                } else {
                                    encuesta.findByIdAndUpdate(req.query.idEncuesta, {
                                        $pull: {
                                            'colaboradores': req.query.id
                                        }
                                    }).then((objeto, error) => {
                                        if (error) {
                                            console.log(error);
                                            return res.json({
                                                'status': 500
                                            })
                                        } else {
                                            return res.json({
                                                'status': 200
                                            })
                                        }
                                    })
                                }

                            }).catch((error) => {
                                console.log(error);
                                return res.json({
                                    'status': 500
                                })
                            })
                        }

                    }).catch((error) => {
                        return res.json({
                            'status': 500
                        })
                    })
            }
        }).catch((error) => {
            console.log(error);
            return res.json({
                'status': 500
            })
        })
};

exports.loadListaEncuestasCompartidas = (req, res, next) => {
    var idObjeto = require('mongoose').Types.ObjectId;
    let listaEncuestasCompartidas = [];
    colaborador.find({
        'usuarioColaborador': new idObjeto(req.query.id)
    })
    .populate('encuestaCompartida')
    .then((resultado, error) => {
        if (error){
            console.log(error);
            return res.json({
                'status':500,
                'listasCompartidas':null
            })
        } else if (resultado.length > 0){
            let contador = 0;
            let limiteDocumento = resultado.length;
            asyncloop(resultado, (item, next) => {
                console.log(item);
                usuario.findById(item.encuestaCompartida.usuario_ID)
                       .then((respuesta, error) => {
                           var compartir = {
                               'nombre': respuesta.nombre,
                               'apellido': respuesta.apellido,
                               'urlImage': respuesta.urlImage,
                               'usuario_ID': respuesta._id,
                               'rol':item.rol,
                               'titulo':item.encuestaCompartida.titulo,
                               'numeroPreguntas': item.encuestaCompartida.preguntas.length,
                               'idEncuesta': item.encuestaCompartida._id
                           };
                           listaEncuestasCompartidas.push(compartir);
                           next();
                           contador ++ ;
                           if (contador === limiteDocumento){
                               return res.json({
                                    'status':200,
                                    'listasCompartidas':listaEncuestasCompartidas
                                })
                           }
                           
                       }).catch((error) => {
                           console.log(error);
                           return res.json({
                               'status':500,
                               'listasCompartidas':null
                           })
                       })
            })
        } else {
            return res.json({
                'status': 200,
                'listasCompartidas':null
            })
        }
    }).catch((error) => {
        console.log(error);
        return res.json({
            'status':500,
            'listasCompartidas':null
        })
    })
};





