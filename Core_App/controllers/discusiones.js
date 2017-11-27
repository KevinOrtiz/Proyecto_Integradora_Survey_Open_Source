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
/
exports.listaDiscusionEncuestaByState = (req,resp,next)=>{
    if (req.query.estadosEncuestas == "revision"){
    discusionEncuesta.find({estado:'revision',encuesta_ID:req.query.encuestaID})
      .then((discusionencuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionencuesta});
      });
    }
    else if (req.query.estadosEncuestas == "resuelto"){
        discusionEncuesta.find({estado:'resuelto',encuesta_ID:req.query.encuestaID})
            .then((discusionencuesta)=>{
            return resp.json({lstdiscusionEncuesta:discusionencuesta});


      });

    }
    else if (req.query.estadosEncuestas == "cerrado"){
        discusionEncuesta.find({estado:'cerrado',encuesta_ID:req.query.encuestaID})
            .then((discusionencuesta)=>{
            return resp.json({lstdiscusionEncuesta:discusionencuesta});

      });

    }
};

exports.listaDiscusionEncuestaClosed = (req,res,next)=>{
    discusionEncuesta.find({encuesta_ID:req.query.encuestaID,fecha_cierre:{$type:2}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta});
     });

};

exports.listaDiscusionEncuestaCurrently = (req,res,next)=>{
 discusionEncuesta.find({encuesta_ID:req.query.encuestaID,fecha_cierre:{$ne:null}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta});
     });
};

exports.currentlyDiscusionEncuesta = (req,res,next)=>{
    discusionEncuesta.findOne({encuesta_ID:req.query.encuestaID,fecha_cierre:{$ne:null}})
     .then((discusionEncuesta)=>{
        return resp.json({lstdiscusionEncuesta:discusionEncuesta});
     });

};

exports.almacenarDiscusionEncuesta = (req,resp,next)=>{
  let discusion = new discusionEncuesta(req.body.discusion);
    discusion.save()
        .then(()=>{
            Encuesta.findOne({identificador:req.body.identificador})
                .then((encuesta)=>{
                    encuesta.discusiones.push(discusion);
                    return resp.json({status:'ok',codec:'200'});
                });
        })
};

exports.editarDiscusionEncuesta = (req,resp,next)=>{
  let objdiscusionEncuesta = req.body.discusion;
  discusionEncuesta.findOneAndUpdate({identificador:req.body.identificador},objdiscusionEncuesta);
  return resp.json({codec:200,status:'ok'});
};

exports.cambiarEstadoDiscusionEncuesta = (req,resp,next)=>{
    discusionEncuesta.findOneAndUpdate({identificador:req.body.identificador},{estado:req.body.estado});
    return resp.json({codec:200,status:'ok'});

};

/**
 *
 * Preguntas
 *
 *
 *
 */





