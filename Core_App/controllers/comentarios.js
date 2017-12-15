const Comentario = require('../models/Comentarios');
const Pregunta = require('../models/Preguntas');
const Encuesta = require('../models/Encuesta');
const discusionPregunta = require('../models/discusionesPregutas');
const discusionEncuesta = require('../models/discusionesEncuestas');

/**
 * Guardar un comentario principal
 * @param req
 * @param resp
 * @param next
 */

exports.guardarComentarioPregunta = (req,resp,next)=>{
    let comentario = new Comentario(req.body.comentario);
    comentario.save()
        .then(()=>{
         Pregunta.findOne({identificador:req.body.pregunta.identificador})
             .then((pregunta)=>{
             pregunta.comentarios.push(comentario);
             return resp.json({status:'ok',codec:200});

             });
        });

};
/**
 *
 * Guardar un comentario de una encuesta
 * @param req
 * @param resp
 * @param next
 */

exports.guardarComentarioEncuesta = (req,resp,next)=>{
    let comentario = new Comentario(req.body.comentario);
    comentario.save()
        .then(()=>{
         Encuesta.findOne({identificador:req.body.encuesta.identificador})
             .then((encuesta)=>{
             encuesta.comentarios.push(comentario);
             return resp.json({status:'ok',codec:200});
             });
        });


};

/**
 *
 * Guardar un comentario de una discusion de una pregunta en especifico
 * @param req
 * @param resp
 * @param next
 */
exports.guardarComentarioDiscusionPregunta = (req,resp,next)=>{
  let comentario = new Comentario(req.body.comentario);
  comentario.save()
      .then(()=>{
        discusionPregunta.findOne({identificador:req.body.discusionPregunta.identificador})
            .then((discusionPregunta)=>{
                discusionPregunta.comentarios.push(comentario);
                return resp.json({status:'ok',codec:200});
            });
      });
};

/**
 *
 * Guardar un comentario de una discusion de una encuesta en especifico
 * @param req
 * @param resp
 * @param next
 */
exports.guardarComentarioDiscusionEncuesta = (req,resp,next)=>{
  let comentario = new Comentario(req.body.comentario);
  comentario.save()
      .then(()=>{
        discusionEncuesta.findOne({identificador:req.body.discusionEncuesta.identificador})
            .then((discusionEncuesta)=>{
                discusionEncuesta.comentarios.push(comentario);
                return resp.json({status:'ok',codec:200});
            });
      });
};

/**
 *
 * Guardar un comentario y que este se referencie al comentario padre
 * Este guardado se da cuando un usuario guarda un comentario dentro de otro comentario
 * @param req
 * @param resp
 * @param next
 */

exports.guardarSubcomentario = (req,resp,next)=>{
    let comentario = new Comentario(req.body.comentario);
    comentario.save()
        .then(()=>{
            Comentario.findOne({identificador:req.body.idComentario})
                .then((objcomentario)=>{
                    objcomentario.listaSubComentarios.push(comentario);
                    resp.json({codec:200,status:'ok'});
                });
        });
};


/**
 * Esta funcion lo que hace es cargar todos los comentarios referente a una pregunta
 * @param req
 * @param resp
 * @param next
 */
exports.cargarComentarioPregunta = (req,resp,next)=>{
    Pregunta.findOne({identificador:req.query.pregunta.identificador})
        .populate({
            path:'comentarios',
            populate:{
              path:'listaSubComentarios',
              model:'comentario'
            }
        })
        .then((pregunta)=>{
            let comentariosPreguntas = pregunta.comentarios;
            return resp.json({comentarios:comentariosPreguntas});

        })


};

/**
 * Esta funcion lo que hace es cargar todos los comentarios referente a una encuesta
 * @param req
 * @param resp
 * @param next
 */

exports.cargarComentarioByEncuesta = (req,resp,next)=>{
    Encuesta.findOne({identificador:req.query.encuesta.identificador})
        .populate({
            path:'comentarios',
            populate:{
              path:'listaSubComentarios',
              model:'comentario'
            }
        })
        .then((encuesta)=>{
            let comentariosEncuestas = encuesta.comentarios;
            return resp.json({comentarios:comentariosEncuestas});
        })

};

/**
 * Esta funcion lo que hace es cargar los comentarios referente a una discusion de una pregunta
 * @param req
 * @param resp
 * @param next
 */

exports.cargarComentarioDiscusionPregunta = (req,resp,next)=>{
    discusionPregunta.findOne({identificador:req.query.discusionPregunta.identificador,titulo:req.query.discusionPregunta.titulo})
        .populate({
            path:'comentarios',
            populate:{
                path:'listaSubComentarios',
                model:'comentario'
            }
        })
        .then((discusion)=>{
            let listacomentarios = discusion.comentarios;
            return resp.json({comentarios:listacomentarios});

        })

};


/**
 *Esta funcion lo que hace es cargar los comentarios referente a una discusion referente a una encuesta
 * @param req
 * @param resp
 * @param next
 */
exports.cargarComentarioDiscusionEncuesta = (req,resp,next)=>{
 discusionEncuesta.findOne({identificador:req.query.discusionEncuesta.identificador,titulo:req.query.discusionEncuesta.titulo})
     .populate({
         path:'comentarios',
         populate:{
             path:'listaSubComentarios',
             model:'comentario'
         }
     })
     .then((discusion)=>{
         let listaComentario = discusion.comentarios;
         return resp.json({comentarios:listaComentario});
     });

};

/**
 *Esta funcion lo que hace es cargar los subcomentarios referente a un comentario
 * @param req
 * @param resp
 * @param next
 */

exports.cargarSubcomentarios = (req,resp,next)=>{
  Comentario.findOne({identificador:req.query.comentario.identificador})
      .populate('listaSubComentarios')
      .then((Comentario)=>{
        return resp.json({listaSubcomentarios:Comentario.listaSubComentarios})
      })
};
/**
 *Esta funcion lo que hace es editar un comentario especifico
 * determinado por un identificador del comentario
 *
 * @param req
 * @param resp
 * @param next
 */

exports.editarComentario = (req,resp,next)=>{
    let objComentario = req.body.comentario;
    Comentario.findOneAndUpdate({identificador:req.body.comentario.identificador},objComentario);
    return resp.json({codec:200,status:'ok'})
};

/**
 *
 * Operaciones para guardar likes, dislikes, favoritos
 *
 */

/**
 *
 * Esta funcion lo que hace es guardar la cantidad de favoritos referente a un comentario
 * @param req
 * @param resp
 * @param next
 */

exports.guardarFavoritos = (req,resp,next)=>{
  Comentario.findOne({identificador:req.body.comentario.identificador})
      .then((comentario)=>{
        let sumarFavoritos = comentario.favoritos + req.body.comentario.favoritos;
        comentario.set('favoritos',sumarFavoritos);
        return resp.json({codec:200,status:'ok'})
      });
};

/**
 *
 * Esta funcion lo que hace es guardar la cantidad de likes referentes a un comentarios
 * @param req
 * @param resp
 * @param next
 */

exports.guardarlikes = (req,resp,next)=>{
  Comentario.findOne({identificador:req.body.identificador})
      .then((comentario)=>{
        let sumarlikes = comentario.likes + req.body.likes;
        comentario.set('favoritos',sumarlikes);
        return resp.json({codec:200,status:'ok'})
      });
};

/**
 *
 * Esta funcion lo que hace es guardar la cantidad de dislikes referente a un comentario
 * @param req
 * @param resp
 * @param next
 */

exports.guardarDislikes = (req,resp,next)=>{
  Comentario.findOne({identificador:req.body.identificador})
      .then((comentario)=>{
        let sumarDislikes = comentario.dislikes + req.body.dislikes;
        comentario.set('favoritos',sumarDislikes);
        return resp.json({codec:200,status:'ok'})
      });
};





