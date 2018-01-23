'use strict';
let modelpregunta = require('../models/Preguntas');
let discusionesPregunta = require('../models/discusionesPregutas');
let correo = require('../correo');
let usuario = require('../models/Usuarios');
let asyncloop = require('node-async-loop');
/**
 *Este metodo guarda una nueva pregunta en la base de datos local (MONGODB)
 * @param req : obtengo el objeto json con informacion como : Nombre,Descripcion,Topico,Lista de preguntas
 * @param res
 * @param next
 */
var listaPregunta = [];

exports.crear = (req, res, next) => {
    const fecha_actual = new Date();
    let discusionPregunta = {
        titulo: 'Pregunta-propuesta',
        descripcion: 'Pregunta recientemente creada',
        creador_ID: req.body.pregunta.usuario_ID,
        etiquetas: [{
            texto: req.body.pregunta.topicos
        }, {
            texto: req.body.pregunta.etiquetas
        }],
        estados: [{
            usuario_ID: req.body.pregunta.usuario_ID,
            texto: 'revision'
        }],
        fecha_creacion: fecha_actual.toString(),
        fecha_cierre: 'sin_definir',
        pregunta_ID: ''
    };
    let pregunta = {
        descripcion: req.body.pregunta.descripcion,
        usuario_ID: req.body.pregunta.usuario_ID,
        historial_cambios: req.body.pregunta.historial_cambios,
        registroActual: req.body.pregunta.registroActual,
        listaImagen: req.body.pregunta.listaImagen,
        etiquetas: {
            texto: req.body.pregunta.etiquetas
        },
        topicos: {
            texto: req.body.pregunta.topicos
        },
        estado: 'revision',
        respuestas: req.body.pregunta.respuestas
    }
    let nuevaPregunta = new modelpregunta(pregunta);
    discusionPregunta.pregunta_ID = nuevaPregunta.toJSON()._id;
    let nuevaDiscusion = new discusionesPregunta(discusionPregunta);
    nuevaDiscusion.save((error) => {
        if (error) {
            return res.json({
                "mensaje": "no se ha generado la discusion automatica",
                "status": 400
            });
        } else {
            usuario.findOne({
                    _id: req.body.pregunta.usuario_ID
                })
                .then((usuario, err) => {
                    if (err) {
                        console.log('error en la consulta de usuario');
                    } else {
                        correo.sendEmailPreguntaCreada(usuario.correo, req.body.pregunta.topicos);
                    }
                }).catch((err) => {
                    console.log('error en el servidor');
                    console.log(err);
                    return res.json({
                        "status": 500
                    })

                });
            nuevaPregunta.discusiones.push(nuevaDiscusion);
            nuevaPregunta.save((error) => {
                if (error) {
                    console.log('error' + error);
                    return res.json({
                        "status": 500
                    })
                } else {
                    return res.json({
                        "messaje": "pregunta guardada correctamente",
                        "status": 200
                    })
                }
            });
        }
    });
};


exports.verPregunta = (req, res, next) => {
    console.log(req.query);
    modelpregunta.findOne({
            _id: req.query.id,
            registroActual: true
        })
        .then((response, err) => {
            if (err) {
                console.log(err);
                return res.json({"status":500})
            } else {
                let pregunta = {
                    descripcion: response.descripcion,
                    topicos: response.topicos.texto,
                    listaImagen: {
                        url: response.listaImagen[0].url
                    },
                    respuestas: response.respuestas,
                    estado: response.registroActual
                };
                return res.json({
                    "pregunta": pregunta,
                    "estado":500
                });

            }
        }).catch((error)=>{
            console.log(error);
            return res.json({"status":500})
        });
}

/**
 *Este metodo realiza cambios sobre una pregunta dado un identificador en la base de datos, la actualizacion es como
 * cualquier metodo normal.
 * @param req
 * @param res
 * @param next
 */

exports.editar = (req, res, next) => {

};


/**
 * En este metodo lo que hace devolver una lista con las preguntas creadas por los usuarios
 * La lista sera obtenida de un repositorio de github
 * @param req
 * @param res
 * @param next
 */

exports.listPreguntas = (req, res, next) => {
    var preguntas = [];
    modelpregunta.paginate({registroActual: true}, {
            page: req.query.page,
            limit: 5,
            sort: {fecha_creacion: 1}
        })
        .then((result) => {
            let contador = 0;
            let limiteDocumento = result.docs.length;
            asyncloop(result.docs, (item, next) => {
                usuario.findOne({
                        _id: item.usuario_ID
                    })
                    .then((usuario, err) => {
                        var pregunta = {
                            _id: item._id,
                            urlUsuario: usuario.urlImage,
                            creador: usuario.nombre + usuario.apellido,
                            topicos: item.topicos,
                            etiquetas: item.etiquetas,
                            descripcion: item.descripcion,
                            estado: item.estado,
                            numeroDiscusiones: item.discusiones.length,
                            numeroComentarios: item.comentarios.length
                        }
                        preguntas.unshift(pregunta);
                        next();
                        contador++;
                        if (contador === limiteDocumento) {
                            return res.json({
                                "preguntas": preguntas,
                                "status": 200,
                                "longitud": limiteDocumento,
                                "paginas": result.pages
                            });

                        }
                    }).catch((error)=>{
                        console.log("error en la consulta de usuario")
                        console.log(error);
                        return res.json({"status":500});
                    });

            });
        }).catch((errorPaginacion) => {
            console.log("error en la consulta de paginacion");
            console.log(errorPaginacion);
            return res.json({"status":500})

        });
};

/**
 * En este metodo lo que hace es devolver una lista de preguntas que concuerden con un conjunto de caracteres
 * la lista sera obtenida de un repositorio de github
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.QueryPreguntas = (req, res, next) => {
    // hago una busqueda por topico : Inteligencia Artificial
    var preguntas = [];
    console.log(req.query.topico);
    modelpregunta.paginate({
            "topicos.texto": new RegExp(req.query.topico, 'i'),
            "registroActual": true
        }, {
            page: req.query.page,
            limit: 5,
            sort: {fecha_creacion: 1}
        })
        .then((result) => {
            let contador = 0;
            let limiteDocumento = result.docs.length;
            asyncloop(result.docs, (item, next) => {
                usuario.findOne({
                        _id: item.usuario_ID
                    })
                    .then((usuario, err) => {
                        var pregunta = {
                            _id: item._id,
                            urlUsuario: usuario.urlImage,
                            creador: usuario.nombre + usuario.apellido,
                            topicos: item.topicos,
                            etiquetas: item.etiquetas,
                            estado: item.estado,
                            descripcion: item.descripcion,
                            numeroDiscusiones: item.discusiones.length,
                            numeroComentarios: item.comentarios.length
                        }
                        preguntas.unshift(pregunta);
                        console.log(preguntas);
                        next();
                        contador++;
                        if (contador === limiteDocumento) {
                            return res.json({
                                "preguntas": preguntas,
                                "status": 200,
                                "longitud": limiteDocumento,
                                "paginas": result.pages
                            });

                        }
                    }).catch((error) => {
                        console.log("error en la consulta de usuario");
                        console.log(error);
                        return res.json({"status":500})
                    });

            });
        }).catch((errorPaginacion) => {
            console.log("error en la consulta de query")
            console.log(errorPaginacion);
            return res.json({"status":500})
        });
};


/**
 * Este metodo lo que hace es cargar la lista de cambios que ha sufrido una pregunta desde el repositorio
 * de github; se debe realizar peticiones a github
 * @param req
 * @param res
 * @param next
 */

exports.loadHistoryChange = (req, res, next) => {

};

exports.loadListaMisPreguntas = (req, resp, next) => {
    modelpregunta.find({
            'usuario_ID': req.query.id,
            "registroActual": true
        })
        .sort({'fecha_creacion':1})
        .then((preguntas, error) => {
            if (error) {
                console.log(error);
                return resp.json({
                    "status": 500
                })
            } else {
                let listaPreguntas = [];
                let numeroElementosPreguntas = preguntas.length;
                let contador = 0;
                asyncloop(preguntas, (item, next) => {
                    var objetoPregunta = {
                        _id: item._id,
                        etiquetas: item.topicos.texto,
                        descripcion: item.descripcion,
                        estado: item.estado
                    }
                    listaPreguntas.unshift(objetoPregunta);
                    next();
                    contador++;
                    if (contador == numeroElementosPreguntas) {
                        return resp.json({
                            "listaPreguntas": listaPreguntas,
                            "status": 200
                        })
                    }
                });

            }
        }).catch((error) => {
            console.log("error en la consulta de mis preguntas");
            console.log(error);
            return resp.json({
                "status":500
            })
        });
}

exports.removePregunta = (req, resp, next) => {
    modelpregunta.findByIdAndRemove({
            '_id': req.query.id
        })
        .then((pregunta, error) => {
            if (error) {
                return resp.json({
                    "status": 500,
                    "messaje": error
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
                "messaje": error
            })
        });
}