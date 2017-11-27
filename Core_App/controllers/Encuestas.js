'use strict';
let MODELENCUESTA = require('../models/Encuestas');

/**
 *Este metodo guarda una nueva encuesta en la base de datos
 * @param req : obtengo el objeto json con informacion como : Nombre,Descripcion,Topico,Lista de preguntas
 * @param res
 * @param next
 */


exports.crear = (req,res,next)=>{

};


/**
 *Este metodo realiza cambios sobre una encuesta dado un identificador en la base de datos , Nota: La actualizacion
 * no debe sobreescribir al registro en la base de datos, si no que debe anadirse despues del elemento anterior
 * y tomarse este objeto como el registro actual en la aplicacion
 * @param req
 * @param res
 * @param next
 */

exports.editar = (req,res,next)=>{

};

/**
 *Este metodo elimina una encuesta dado un identificador
 * @param req
 * @param res
 * @param next
 */

exports.eliminar = (req,res,next)=>{

};

/**
 * En este metodo lo que hace devolver una lista con las encuestas creadas por los usuarios
 * @param req
 * @param res
 * @param next
 */

exports.listEncuestas=(req,res,next)=>{

};

/**
 * En este metodo lo que hace es devolver una lista de encuestas que concuerden con un conjunto de caracteres
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.QueryEncuestas = (req,res,next)=>{

};

/**
 *
 *Este metodo crea un issue de una encuesta dado un identificador y recibe un json con la informacion de referencia
 * a que encuesta se refiere , las categorias del issues,titulo del issue de la encuesta, descripcion del issue
 * de la encuesta, estado de la encuesta
 * @param req
 * @param res
 * @param next
 */

exports.crearIssue = (req,res,next)=>{

};
/**
 *Este metodo edita el estado de un issues dado un identificador, este identificador ayuda setear los diferentes
 * estados del issues como son : discusion,resuelto,cerrado
 * @param req
 * @param res
 * @param next
 */

exports.editarStateIssue = (req,res,next)=>{

};
/**
 *Este metodo elimina un issue de la base de dato dado un identificador
 * @param req
 * @param res
 * @param next
 */

exports.deleteIssue = (req,res,next)=>{

};
/**
 *Este metodo lo que hace es cargar la lista de issues dado un identificador y un estado del issues, lo que devuelve
 * es un json con la lista de todos los issues respectivo de una encuesta dado una encuesta
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.LoadIssuebyState = (req,res,next)=>{

};
/**
 *Este metodo lo que hace es retornar la lista de todos las encuestas y cada una estara asociada la cantidad de issues
 * por estado : ej encuesta 1 issues 12 estado revision
 * @param req
 * @param res
 * @param next
 */

exports.loadListaIssuesByState = (req,res,next)=>{

};

/**
 * Este metodo lo que hace es cargar el historial de los cambios que se ha hecho sobre una encuesta
 * @param req
 * @param res
 * @param next
 */

exports.loadHistoryChange = (req,res,next)=>{

};

/**
 *Guardo un comentarios referente a una encuesta
 *
 * @param req
 * @param res
 * @param next
 */

exports.guardarComentarios = (req,res,next)=>{

};

/**
 *Realizo un cambio sobre una encuesta
 *
 * @param req
 * @param res
 * @param next
 */
exports.editarComentarios = (req,res,next)=>{

};

/***
 *
 *Elimino una encuesta determinada
 * @param req
 * @param res
 * @param next
 */

exports.eliminarComentarios = (req,res,next)=>{

};

/**
 * enlista todos los comentarios referente a una encuesta
 * @param req
 * @param res
 * @param next
 */

exports.listarComentarios = (req,res,next)=>{

};