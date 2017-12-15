'use strict';
let encuesta = require('../models/Encuestas');
let pregunta = require('../models/Preguntas');

/**
 *Este metodo guarda una nueva encuesta en la base de datos
 * @param req : obtengo el objeto json con informacion como : Nombre,Descripcion,Topico,Lista de preguntas
 * @param res
 * @param next
 */


exports.crearEncuesta = (req,resp,next)=>{
    let instanceEncuesta = new encuesta(req.body.encuesta);
    instanceEncuesta.save()
        .then(()=>{
            for (var indexPregunta in req.body.identificadorPregunta ){
                    pregunta.findOne({identificador:indexPregunta})
                        .then((instancePregunta)=>{
                            instanceEncuesta.preguntas.push(instancePregunta);
                        });
            }
            return resp.json({status:'ok',codec:200});
        });
};




/**
 *Este metodo realiza cambios sobre una encuesta dado un identificador en la base de datos , Nota: La actualizacion
 * no debe sobreescribir al registro en la base de datos, si no que debe anadirse despues del elemento anterior
 * y tomarse este objeto como el registro actual en la aplicacion
 * @param req
 * @param res
 * @param next
 */

exports.editarEncuesta = (req,resp,next)=>{
    encuesta.findOneAndUpdate({identificador:req.body.identificadorEncuestaAnterior},{registroActual:false})
        .then(()=>{
            let encuestaNueva = new encuesta(req.body.encuestaActual);
            encuestaNueva.save()
                .then(()=>{
                    for (var indexPregunta in req.body.listaIdentificadoresPregunta){
                        pregunta.findOne({identificador:indexPregunta})
                            .then((instancePregunta)=>{
                                encuestaNueva.preguntas.push(instancePregunta)

                            });
                    }
                    encuestaNueva.set('registroActual',true);
                    return resp.json({status:'ok',codec:200});
                });
        });



};

/**
 *Este metodo elimina una encuesta dado un identificador
 * @param req
 * @param res
 * @param next
 */

exports.eliminarEncuesta = (req,resp,next)=>{
    encuesta.findByIdAndRemove(req.body._idEncuesta,(err,instanceEncuesta)=>{
        resp.json({'status':'delete',codec:200});
    });
};



/**
 * En este metodo lo que hace devolver una lista con las encuestas creadas por un usuario
 * @param req
 * @param res
 * @param next
 */

exports.listEncuestas=(req,resp,next)=>{
    let lstEncuestas = [];
    encuesta.find({usuario_ID:req.query.usuarioID,registroActual:true})
        .then((listaEncuestas)=>{
            for(var instancelstEncuestas in listaEncuestas){
                let objEncuestas ={
                    identificador:instancelstEncuestas.identificador,
                    titulo:instancelstEncuestas.titulo,
                    descripcion:instancelstEncuestas.descripcion,
                    fecha_creacion:instancelstEncuestas.fecha_creacion,
                    fecha_cierre:instancelstEncuestas.fecha_cierre,
                    usuarioId:instancelstEncuestas.usuarioID,
                    colaboradores:instancelstEncuestas.colaboradores,
                    numerosColaboradores:instancelstEncuestas.colaboradores.length,
                    registroActual:instancelstEncuestas.registroActual,
                    etiqueta:instancelstEncuestas.etiqueta,
                    topicos:instancelstEncuestas.topicos,
                    numerospreguntas:instancelstEncuestas.preguntas.length,
                    numerodiscusiones:instancelstEncuestas.discusiones.length,
                    numerocomentarios:instancelstEncuestas.comentarios.length
                };
                lstEncuestas.push(objEncuestas);
            }
            return resp.json({listaEncuestasUsuario:lstEncuestas});
        });

};

/**
 *
 * @param req
 * @param resp
 * @param next
 */
exports.listPreguntasByEncuesta = (req,resp,next)=>{
    encuesta.findOne({identificador:req.query.identificador,registroActual:true})
        .populate('preguntas')
        .then((instanceEncuesta)=>{
            return resp.json({listaPreguntas:instanceEncuesta.preguntas});
        });
};
/**
 *
 * @param req
 * @param resp
 * @param next
 */
exports.listDiscusionByEncuesta = (req,resp,next)=>{
    encuesta.findOne({identificador:req.query.identificador,registroActual:true})
        .populate('discusiones')
        .then((instanceEncuesta)=>{
            return resp.json({listaDiscusiones:instanceEncuesta.discusiones})
        });
};
/**
 *
 * @param req
 * @param resp
 * @param next
 */
exports.listComentariosByEncuesta = (req,resp,next)=>{
  encuesta.findOne({identificador:req.query.identificador,registroActual:true})
      .populate('comentarios')
      .then((instanceEncuesta)=>{
        return resp.json({listaComentarios:instanceEncuesta.comentarios})
      });
};


/**
 * En este metodo lo que hace es devolver una lista de encuestas que concuerden con un conjunto de caracteres
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.QueryEncuestasByTitulo = (req,resp,next)=>{
    encuesta.find({$text:{$search:req.query.titulo},registroActual:true})
        .skip(20)
        .limit(10)
        .then((encuestaInstance)=>{
            console.log(encuestaInstance);
            return resp.json({listaEncuestas:encuestaInstance});
        });
};

/**
 * Este metodo lo que hace es hacer un search de una lista de encuestas que concuerden con un etiqueta determinada
 * @param req
 * @param resp
 * @param next
 * @constructor
 */
exports.QueryEncuestasByEtiquetas = (req,resp,next)=>{
    encuesta.find({$text:{$search:req.query.etiqueta},registroActual:true})
        .skip(20)
        .limit(10)
        .then((encuestaInstance)=>{
            console.log(encuestaInstance);
            return resp.json({listaEncuestas:encuestaInstance})
        });
};

/**
 * Este metodo lo que hace es hacer un search de una lista de encuestas que concuerden con un topico determinado
 * @param req
 * @param resp
 * @param next
 * @constructor
 */

exports.QueryEncuestasByTopicos = (req,resp,next)=>{
    encuesta.find({$text:{$search:req.query.topicos},registroActual:true})
        .skip(20)
        .limit(10)
        .then((encuestaInstance)=>{
            console.log(encuestaInstance);
            return resp.json({listaEncuestas:encuestaInstance});
        });
};



/**
 * Este metodo lo que hace es cargar el historial de los cambios que se ha hecho sobre una encuesta dado un identificador
 * @param req
 * @param res
 * @param next
 */

exports.loadHistoryChange = (req,resp,next)=>{
    var listHistorialEncuestas = [];
    encuesta.find({identificador:req.query.identificador,usuario_ID:req.query.usuarioID})
        .then((historialEncuesta)=>{
            for(var objEncuesta in historialEncuesta){
                var registroCambioEncuesta = {
                  titulo:objEncuesta.titulo,
                  descripcion:objEncuesta.descripcion,
                  fecha_creacion:objEncuesta.fecha_creacion,
                  fecha_edicion:objEncuesta.fecha_edicion,
                  historial:objEncuesta.historial_cambios
                };
                listHistorialEncuestas.push(registroCambioEncuesta);
            }
            resp.json({listaCambiosByEncuesta:listHistorialEncuestas});
        });

};

exports.exportarEncuestaTellForm= (req,resp,next)=>{

};
