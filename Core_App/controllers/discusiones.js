const Comentario = require('../models/Comentarios');
const Pregunta = require('../models/Preguntas');
const Usuario = require('../models/Usuarios');
const discusionPregunta = require('../models/discusionesPregutas');
const correo = require('../correo');
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
                },{
                    'new': true,
                    'upsert': true
                }).then((pregunta,error)=>{
                    console.log("**********");
                    console.log(pregunta);
                    console.log("**********");
                    Usuario.findOne({'_id':pregunta.usuario_ID}).then((usuario,error)=>{
                        correo.sendCorreoDiscusionCreada(usuario.correo,usuario.nombre,req.body.respuestaDiscusion.titulo);
                    });
                    if (error){
                      return  resp.json({"status":500}); 
                    }
                    else {
                        return resp.json({"status":200});
                    }
                });
            }).catch((error) => {
                console.log('error');
                console.log(error);
            });
    }
}

exports.loadListaDiscusiones = (req, resp, next)=>{
    console.log(req.query);
    var skip = req.query.pagina * 5;
    if ( req.query.tipoDiscusion == 'pregunta'){
        console.log('entre aqui');
        const listaDiscusiones = [];
        Pregunta.findOne({
            '_id': req.query.idcuerpodiscusion
        }).then((pregunta, error) => {
            console.log("*********")
            console.log(pregunta);
            console.log("*********")
            if (pregunta.discusiones.length > skip) {
                console.log('entre tambien aqui');
                Pregunta.findOne({
                    "_id": req.query.idcuerpodiscusion
                },{
                    'discusiones':{
                        $slice: [skip,5]
                    }
                })
                .populate('discusiones')
                .then((pregunta, error)=>{
                    console.log(error);
                    if (error){
                        console.log(error);
                    }else {
                        console.log(pregunta);
                        let contador = 0;
                        let totalDocumento = pregunta.discusiones.length;
                        asyncloop(pregunta.discusiones, (item, next)=>{
                            Usuario.findOne({
                                '_id': item.creador_ID
                            })
                            .then((usuario, error)=>{
                                var discusion = {
                                    creador: usuario.nombre + usuario.apellido,
                                    urlUsuario: usuario.urlImage,
                                    titulo: item.titulo,
                                    etiquetas: item.etiquetas,
                                    descripcion: item.descripcion,
                                    _id:item._id,
                                    numeroComentarios: item.comentarios.length
                                }
                                listaDiscusiones.push(discusion);
                                next();
                                contador ++;
                                console.log(contador);
                                console.log(totalDocumento);
                                if (contador == totalDocumento){
                                    console.log(listaDiscusiones)
                                    return resp.json({
                                        'discusiones':listaDiscusiones
                                    });

                                }
                            }).catch((error)=>{
                                console.log(error);
                            })
                        });
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
}