const Usuario = require('../models/Usuarios');
const notificaciones = require('../models/Notificaciones');
let asyncloop = require('node-async-loop');

/**
 * estas acciones van a guardar los mensajes o las discusiones que otros usuarios
 * crean en la aplicacion
 * socket id hace referencia al usuario que deseo enviar
 */
exports.setAcciones = (socket, mensaje, obj, io) => {
    var notifica = {
        tipo: mensaje.tipo,
        descripcion: mensaje.texto
    }
    let notificacion = new notificaciones(notifica);
    notificacion.save()
        .then(() => {
            Usuario.findById({
                "_id": mensaje.emisor
            }).then((usuario, err) => {
                if (err) {
                    console.log(err);
                }

                notificaciones.findByIdAndUpdate({
                        '_id': notificacion._id
                    }, {
                        $push: {
                            'usuario_emisor': usuario
                        }
                    },{
                        upsert: true,
                        new: true
                    })
                    .populate('usuario')
                    .then((notificacion, error) => {
                        Usuario.findByIdAndUpdate({
                            "_id": mensaje.receptor
                        }, {
                            $push: {
                                'notificaciones': notificacion
                            }
                        }).then((usuario, error) => {
                            if (error) {
                                console.log(error);
                            }
                            if (obj) {
                                io.sockets.sockets[obj].emit('acciones', notificacion);
                            }

                        }).catch((error) => {
                            console.log(error);
                        })

                    }).catch((error) => {
                        console.log(error);
                    })

            }).catch((error) => {
                console.log(error);

            })
        })
}

exports.loadNumeroAccionesUsuario = (req, res, next) => {
    console.log('entre a numero de acciones');
    let contadorAcciones = 0;
    Usuario.findById({
            "_id": req.query.id
        })
        .populate('notificaciones')
        .then((usuario, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "numeroNotificaciones": 0
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {
                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo !== 'comentario') {
                        contadorAcciones++;
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "numeroNotificaciones": contadorAcciones
                        })
                    }
                }, (error) => {
                    if (error) {
                        console.log('error');
                        return res.json({
                            "status": 500,
                            "numeroNotificaciones": 0
                        })
                    }
                })

            }


        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "numeroNotificaciones": 0
            })
        })
}

exports.loadNumeroMensajesUsuarios = (req, res, next) => {
    console.log('entre a mensajes de usuarios');
    let contadorAcciones = 0;
    Usuario.findById({
            "_id": req.query.id
        })
        .populate('notificaciones')
        .then((usuario, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "numeroMensajes": contadorAcciones
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {

                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo === 'comentario') {
                        contadorAcciones++;
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "numeroMensajes": contadorAcciones
                        })
                    }
                }, (error) => {
                    if (error) {
                        console.log(error);
                        return res.json({
                            "status": 500,
                            "numeroMensajes": 0
                        })
                    }
                })
            }


        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "numeroMensajes": 0
            })
        })
}

exports.loadListaAcciones = (req, res, next) => {
    console.log('load lista acciones');
    let listaAcciones = [];
    Usuario.findById({
            "_id": req.query.id
        })
        .populate({
            path: 'notificaciones',
            populate: {
                path: 'usuario_emisor',
                model: 'usuario'
            }
        })
        .then((usuario, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "listaAcciones": null
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {

                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo !== 'comentario') {
                        listaAcciones.push(item)
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "listaAcciones": listaAcciones
                        })
                    }
                }, (error) => {
                    if (error) {
                        console.log(error);
                        return res.json({
                            "status": 500,
                            "listaAcciones": null
                        })
                    }
                })

            }else {
                return res.json({
                    "status": 200,
                    "listaAcciones": null
                })
            }


        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaAcciones": null
            })
        })

}

exports.loadListaMensajes = (req, res, next) => {
    let listaMensajes = [];
    Usuario.findById({
            "_id": req.query.id
        })
        .populate({
            path: 'notificaciones',
            populate: {
                path: 'usuario_emisor',
                model: 'usuario'
            }
        })
        .then((usuario, error) => {
            console.log(usuario);
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "listaMensajes": null
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {

                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo === 'comentario') {
                        listaMensajes.push(item)
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "listaMensajes": listaMensajes
                        })
                    }
                }, (error) => {
                    if (error) {
                        return res.json({
                            "status": 500,
                            "listaMensajes": null
                        })
                    }
                })

            }else {
                return res.json({
                    "status": 200,
                    "listaMensajes": null
                })
            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaMensajes": null
            })
        })


}

exports.loadListaFiveAcciones = (req, res, next) => {
    console.log('load lista acciones');
    var listaAcciones = []
    Usuario.findById({
            "_id": req.query.id
        })
        .populate({
            path: 'notificaciones',
            populate: {
                path: 'usuario_emisor',
                model: 'usuario'
            }
        }).then((usuario, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "listaAcciones": null
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {

                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo !== 'comentario') {
                        listaAcciones.push(item)
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "listaAcciones": listaAcciones
                        })
                    }
                })

            } else {
            return res.json({
                "status":200,
                "listaAcciones":null
            })
            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaAcciones": null
            })
        });
}

exports.loadListaFiveMensajes = (req, res, next) => {
    console.log('loadListaFiveMensajes');
    var listaMensajes = []
    Usuario.findById({
            "_id": req.query.id
        })
        .populate({
            path: 'notificaciones',
            populate: {
                path: 'usuario_emisor',
                model: 'usuario'
            }
        }).then((usuario, error) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 404,
                    "listaMensajes": null
                })
            }
            let contador = 0;
            let totalDocumento = usuario.notificaciones.length;
            if (totalDocumento > 0) {

                asyncloop(usuario.notificaciones, (item, next) => {
                    if (item.tipo === 'comentario') {
                        listaMensajes.push(item)
                    }
                    next();
                    contador++;
                    if (contador === totalDocumento) {
                        return res.json({
                            "status": 200,
                            "listaMensajes": listaMensajes
                        })
                    }
                })

            } 
            else {
                return res.json({
                    "status":200,
                    "listaMensajes":null
                })
            }

        }).catch((error) => {
            console.log(error);
            return res.json({
                "status": 500,
                "listaMensajes": null
            })
        });
}