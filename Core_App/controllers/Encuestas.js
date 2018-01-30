
'use strict';
let encuesta = require('../models/Encuestas');
let preguntasValidas = require('../models/preguntasValidadas');
let asyncloop = require('node-async-loop');
let usuario = require('../models/Usuarios');


exports.getListaPreguntasValidas=(req, resp, next) => {
    console.log('entre');
    var listapreguntasValidas = [];
    preguntasValidas.paginate({}, {
        page: req.query.page,
        limit:5,
        sort: {fecha_creacion: -1}
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
                    id: item._id,
                    url: item.listaImagen[0].url,
                    topicos: item.topicos.texto,
                    fecha_creacion: item.fecha_creacion,
                    descripcion: item.descripcion,
                    respuestas : item.respuestas
                }
                listapreguntasValidas.push(preguntasValidas);
                next();
                contador ++;
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
            "status":500,
            "listaPreguntas": []
        })

    })
}

exports.guardarEncuesta = (req, res , next) => {
    var  preguntas = []
   var contador = 0;
    let limiteDocumento = req.body.encuesta.preguntas.length;
    asyncloop(req.body.encuesta.preguntas,(item, next) => {
        preguntas.push(item.id);
        next();
        contador ++ ;
        if (contador === limiteDocumento) {
            req.body.encuesta.preguntas = preguntas;
            let nuevaEncuesta = new encuesta(req.body.encuesta);
            nuevaEncuesta.save((error) => {
                if (error){
                    console.log(error);
                    return res.json({
                        "status":404,
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
                "status":404,
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
                        "status":404,
                        "encuesta": null
                    })
                }
                else {
                    var encuestaObject = {
                        usuario : {
                            url : responseUsuario.urlImage,
                            nombre: responseUsuario.nombre + responseUsuario.apellido,
                        },
                        fecha_creacion: response.fecha_creacion,
                        titulo: response.titulo,
                        etiqueta: response.etiqueta,
                        descripcion: response.descripcion,
                        preguntas:response.preguntas,
                        contenidoMultimedia: {
                            url: response.contenido_multimedia.url
                        }
                    }
                    return res.json({
                        "status":200,
                        "encuesta": encuestaObject
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    "status":500,
                    "encuesta": null
                })
            })
        }
    }).catch((error) => {
        return res.json({
            "status":500,
            "encuesta":null
        })
    })
}

exports.loadListaMyEncuestas = (req, res, next) => {
    var listaMyEncuestas = []
    encuesta.find({
        usuario_ID: req.query.id,
        registroActual: true
    }).then((respuesta, error)=> {
        if (error) {
            console.log(error);
            return res.json({
                "status": 404,
                "listaMyEncuestas":null
            })
        }else {
            let contador = 0;
            let limiteDocumento = respuesta.length;
            asyncloop(respuesta, (item, next) => {
                var encuesta = {
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    id: item._id,
                    fecha_creacion: item.fecha_creacion,
                    numeroPreguntas: item.preguntas.length
                }
                listaMyEncuestas.push(encuesta)
                contador ++;
                next();
                if (contador === limiteDocumento){
                    return res.json({
                        "status":200,
                        "encuestas": listaMyEncuestas
                    })
                }

            })

        }

    }).catch((error) => {
        console.log(error);
        return res.json({
            "status":500,
            "listaMyEncuestas": null
        })
    })
}

exports.queryEncuestas = (req, res, next) => {
    var encuestas = []
    encuesta.paginate({
        "etiqueta.texto": new RegExp(req.query.topico, 'i'),
        "registroActual": true
    }, {
        page: req.query.page,
        limit: 5,
        sort: {fecha_creacion: -1}
    })
    .then((result, err) => {
        if (err) {
            console.log(err);
            return res.json({
                "status":404,
                "messajes": 'no hay mas elementos para cargar',
                "listaEncuestas" : null
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
                        "status":404,
                        "messaje": 'error en la consulta de usuario',
                        "listaEncuestas": null
                    })
                } 
                else {
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
                        numeroComentarios: item.comentarios.length,
                        contenidoMultimedia: {
                            url : item.contenido_multimedia.url
                        }
                    }
                    encuestas.push(encuesta);
                    next();
                    contador ++ ;
                    if (contador === limiteDocumento){
                        return res.json({
                            "listaEncuestas":encuestas,
                            "status":200,
                            "longitud": limiteDocumento,
                            "paginas": result.pages
                        });
                    }

                }

            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    "status":500,
                    "listaEncuestas":null
                })
            })
        })

        }else {
            return res.json({
                "status":200,
                "listaEncuesta":null
            })

        }
    })
}

exports.loadListaEncuestas = (req, res, next) => {
    var encuestas = []
    encuesta.paginate({
        registroActual: true
    },{
        page: req.query.page,
        limit: 5,
        sort: {fecha_creacion: -1}
    })
    .then((result, err) => {
        if (err) {
            console.log(err);
            return res.json({
                "status":404,
                "listaEncuestas": null
            })
        }else{
            console.log(result);
            let contador = 0;
            let limiteDocumento = result.docs.length;
            asyncloop(result.docs, (item, next) => {
                usuario.findOne({
                    _id: item.usuario_ID
                })
                .then((usuario, err) => {
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
                    contador ++ ;
                    if (contador === limiteDocumento){
                        return res.json({
                            "listaEncuestas":encuestas,
                            "status":200,
                            "longitud": limiteDocumento,
                            "paginas": result.pages
                        });
                    }

                })
                .catch((error) => {
                    console.log(error);
                    return res.json({
                        "status":500,
                        "listaEncuestas":null
                    })
                })
            })
        }
    })
    .catch((error)=> {
        console.log(error);
        return res.json({
            "status":500,
            "listaEncuestas":null
        })
    })
}