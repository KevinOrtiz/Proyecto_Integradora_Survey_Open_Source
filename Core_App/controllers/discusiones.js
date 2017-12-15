const Comentario = require('../models/Comentarios');
const Pregunta = require('../models/Preguntas');
const Encuesta = require('../models/Encuesta');
const discusionPregunta = require('../models/discusionesPregutas');
const discusionEncuesta = require('../models/discusionesEncuestas');

/**
 * ENCUESTAS
 *
 *Cargar el historial de issues de una encuesta
 *Cargar el issues vigente de una encuesta
 *Almacenar un issues de una encuesta
 *Eliminar un issues de una encuesta
 * Editar un issues de una encuesta
 */

/**
 * Esta funcion devuelve una lista de discusiones referente a una encuesta en especifico dado un estado en especifico
 * los estados pueden ser : rechazado, resuelto,revision
 * los parametros para la consulta son el estado de la discusion y el codigo ID de la encuesta
 * @param req
 * @param resp
 * @param next
 */

exports.listaDiscusionEncuestaByState = (req,resp,next)=>{
        discusionEncuesta.find({estado:req.query.discusionEncuesta.estado,encuesta_ID:req.query.discusionEncuesta.encuesta_ID})
            .then((discusionencuesta)=>{
            return resp.json({lstdiscusionEncuesta:discusionencuesta,status:req.query.discusionEncuesta.estadosEncuestas,codec:200,status:'ok'});
      });
    };

/**
 *
 *
 *Esta funcion devuelve la lista de encuesta que ya se encuentran cerradas
 * en esta lista se puede visualizar los diferentes estados que ha tenido dicha encuesta
 * @param req
 * @param res
 * @param next
 */

exports.listaDiscusionEncuestaClosed = (req,resp,next)=>{
    discusionEncuesta.find({encuesta_ID:req.query.discusionEncuesta.encuestaID,fecha_cierre:{$type:2}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta,codec:200,status:'ok'});
     });
};

/**
 *
 *Esta funcion lo que hace es mostrar la lista de discusiones referentes a una encuesta
 * que todavia se encuentran abiertas es decir donde el campo de fecha_cierre es null
 * @param req
 * @param res
 * @param next
 */

exports.listaDiscusionEncuestaCurrently = (req,res,next)=>{
 discusionEncuesta.find({encuesta_ID:req.query.discusionEncuesta.encuestaID,fecha_cierre:{$ne:null}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta,codec:200,status:'ok'});
     });
};

/**
 *Esta funcion lo que hace es cargar una discusion abierta referente a una encuesta
 * @param req
 * @param res
 * @param next
 */
exports.currentlyDiscusionEncuesta = (req,res,next)=>{
    discusionEncuesta.findOne({encuesta_ID:req.query.discusionEncuesta.encuestaID,fecha_cierre:{$ne:null}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta});
     });

};
/**
 * Esta funcion lo que crea es una discusion referente a una encuesta
 * @param req
 * @param resp
 * @param next
 */

exports.almacenarDiscusionEncuesta = (req,resp,next)=>{
    //nota:el objeto que viene desde la vista debe tener el mismo formato
    //definido en el modelo de discusion de encuesta
    //es obligatorio que dentro del objeto se indique el ID de la pregunta
    // si un usuario creo que la discusion es necesario que se envie el id del creador de la discusion
    //de la pregunta
  let discusion = new discusionEncuesta(req.body.discusionEncuesta);
    discusion.save()
        .then(()=>{
            Encuesta.findOne({identificador:req.body.encuesta.identificador})
                .then((encuesta)=>{
                    encuesta.discusiones.push(discusion);
                    return resp.json({status:'ok',codec:200});
                });
        })
};

/**
 *
 * Esta funcion lo que hace es editar la discusion referente a una encuesta
 *
 * @param req
 * @param resp
 * @param next
 */

exports.editarDiscusionEncuesta = (req,resp,next)=>{
  let objdiscusionEncuesta = req.body.discusionEncuesta;
  discusionEncuesta.findOneAndUpdate({identificador:req.body.discusionEncuesta.identificador},objdiscusionEncuesta);
  return resp.json({codec:200,status:'ok'});
};

/**
 *
 * Esta funcion lo que hace es cambiar el estado de la discusion de una encuesta
 * @param req
 * @param resp
 * @param next
 */
exports.cambiarEstadoDiscusionByEncuesta = (req,resp,next)=>{
    discusionEncuesta.findOneAndUpdate({identificador:req.body.discusionEncuesta.identificador},{estado:req.body.discusionEncuesta.estadoEncuesta});
    return resp.json({codec:200,status:'ok'});
};


/**
 *
 * Esta funcion lo que hace es cargar la lista de encuestas y las cantidad
 * de discusiones por usuario
 * @param req
 * @param resp
 * @param next
 */

exports.cargarCantidadDiscusionesByEncuesta = (req,resp,next)=>{
    let cantidadDiscusionesByEncuesta = [];
    Encuesta.find({usuario_ID:req.query.encuesta.idUsuario})
        .then((encuesta)=>{
            for (var instanceEncuesta in encuesta){
                var encuesta = {
                    contenido:instanceEncuesta,
                    numeroDiscusiones:encuesta.numeroDiscusionesEncuesta
                };
                cantidadDiscusionesByEncuesta.push(encuesta);
            }
            return resp.json({lstCantidadDiscusionesByEncuesta:cantidadDiscusionesByEncuesta});
        });
};


/**
 *
 * Preguntas
 *
 * Cargar el historial de issues de una pregunta
 * Cargar el issues vigente de una encuesta
 * Almacenar un issues de una encuesta
 * Eliminar un issues de una encuesta
 * Editar un issues de una encuesta
 * Cambiar de estado el issues de una encuesta
 * Si el estado del issues pasa a ser resuelto, la pregunta se sube a github
 *
 *
 */

/**
 *
 * Esta funcion lo que hace es cargar la lista de discusiones de las preguntas que han sido cerradas
 * Cerradas : Se puede dar el caso que la pregunta ya ha sido aceptada por el comite o han sido rechazadas
 * el caso que se de que se encuentren abiertas  es por que todavia se encuentran en estado de revision
 * @param req
 * @param resp
 * @param next
 */

exports.listaDiscusionPreguntaClosed = (req,resp,next)=>{
   discusionPregunta.find({pregunta_ID:req.query.discusionPregunta.preguntaID,fecha_cierre:{$type:2}})
       .then((discusionPregunta)=>{
        return resp.json({lstdiscusionPregunta:discusionPregunta});
       });
};
/**
 *
 * Esta funcion lo que hace es cargar la lista de discusiones de preguntas que se encuentran abiertas
 * o su estado esta en revision
 * @param req
 * @param resp
 * @param next
 */

exports.listaDiscusionPreguntaCurrently = (req,resp,next)=>{
    discusionPregunta.find({pregunta_ID:req.query.discusionPregunta.preguntaID,fecha_cierre:{$ne:null}})
        .then((discusionPregunta)=>{
            return resp.json({lstdiscusionPregunta:discusionPregunta});
        });
};
/**
 *
 * Esta funcion lo que hace es cargar las discusiones que se encuestran en revision
 * @param req
 * @param resp
 * @param next
 */

exports.currentlyDiscusionPregunta = (req,resp,next)=>{
  discusionPregunta.findOne({pregunta_ID:req.query.discusionPregunta.preguntaID,fecha_cierre:{$ne:null}})
      .then((discusionPregunta)=>{
        return resp.json({lstdiscusionPregunta:discusionPregunta});
      });
};
/**
 *
 * Esta funcion lo que hace es almacenar una discusion referente a una pregunta y ademas se debe referenciar
 * a la pregunta en cuestion
 * @param req
 * @param resp
 * @param next
 */

exports.almacenarDiscusionPregunta = (req,resp,next)=>{
    let discusionPregunta = new discusionPregunta(req.body.discusionPregunta);
    discusionPregunta.save()
        .then(()=>{
            Pregunta.findOne({identificador:req.body.discusionPregunta.preguntaID})
                .then((pregunta)=>{
                    pregunta.discusiones.push(discusionPregunta);
                    return resp.json({status:'ok',codec:200});
                });
        });

};
/**
 *
 * Esta funcion lo que hace ES EDITAR LA DISCUSION DE UNA PREGUNTA
 * @param req
 * @param resp
 * @param next
 */
exports.editardiscusionPregunta = (req,resp,next)=>{
  let objdiscusionPregunta = req.body.discusionPregunta;
  discusionPregunta.findOneAndUpdate({identificador:req.body.discusionPregunta.identificador},objdiscusionPregunta);
  return resp.json({status:'ok',codec:200});
};


/**
 *
 *
 * MODULOS DE ESTADOS DE PREGUNTAS
 * GUARDAR UN NUEVO ESTADO DE UNA DISCUSION DE UNA PREGUNTA {USUARIO_CREADOR_ESTADO,TIPO_ESTADO}
 * ACTUALIZAR UN ESTADO DE UNA DISCUSION DE UNA PREGUNTA POR UN USUARIO DETERMINADO
 * INDICAR SI UN DISCUSION DE UNA PREGUNTA SE HA RESUELTO O SE HA CERRADO O CONTINUA EN REVISION
 * Si una discusion ha sido resuelta , enviar determinada  a una coleccion de preguntas resueltas
 *
 */



/**
 *
 * @param req
 * @param resp
 * @param next
 */
exports.cambiarEstadoDiscusionPregunta=(req,resp,next)=>{
    discusionPregunta.findOne({identificador:req.body.identificador})
        .then((discusionPregunta)=>{
            discusionPregunta.estados.push(req.body.estadosDiscusionPregunta);
            let listaEstados = discusionPregunta.estados;
            for (var obj in listaEstados){
                if (obj.texto == 'rechazada'){
                    return resp.json({status:"existen un miembro del comite que no ha aceptado los cambios de su pregunta",codec:303})
                }

            }
            /**
             * Aqui debe ir una funcion que sube la pregunta a Github
             *
             */
            return resp.json({status:"ok",codec:200});
        });
};


