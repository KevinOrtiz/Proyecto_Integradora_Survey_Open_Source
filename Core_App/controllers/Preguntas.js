'use strict';
let modelpregunta = require('../models/Preguntas');

/**
 *Este metodo guarda una nueva pregunta en la base de datos local (MONGODB)
 * @param req : obtengo el objeto json con informacion como : Nombre,Descripcion,Topico,Lista de preguntas
 * @param res
 * @param next
 */


exports.crear = (req,res,next)=>{

};


/**
 *Este metodo realiza cambios sobre una pregunta dado un identificador en la base de datos, la actualizacion es como
 * cualquier metodo normal.
 * @param req
 * @param res
 * @param next
 */

exports.editar = (req,res,next)=>{

};


/**
 * En este metodo lo que hace devolver una lista con las preguntas creadas por los usuarios
 * La lista sera obtenida de un repositorio de github
 * @param req
 * @param res
 * @param next
 */

exports.listPreguntas=(req,res,next)=>{

};

/**
 * En este metodo lo que hace es devolver una lista de preguntas que concuerden con un conjunto de caracteres
 * la lista sera obtenida de un repositorio de github
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.QueryPreguntas = (req,res,next)=>{

};

/**
 *
 *Este metodo crea un issue de una pregunta dado un identificador y recibe un json con la informacion de referencia
 * a que encuesta se refiere , las categorias del issues,titulo del issue de la preguntas, descripcion de la pregunta
 * estado de la pregunta
 * @param req
 * @param res
 * @param next
 */

exports.crearIssue = (req,res,next)=>{

};
/**
 *Este metodo edita el estado de un issues dado un identificador, este identificador ayuda setear los diferentes
 * estados del issues como son : discusion,resuelto,cerrado
 * Nota si el issues es resuelto, la pregunta debe subirse al repositorio determinado aplicando los cambios respectivos
 * y eliminando esa pregunta en la base de datos Local(Mongo DB)
 * @param req
 * @param res
 * @param next
 */

exports.editarStateIssue = (req,res,next)=>{

};
/**
 *Este metodo elimina un issue de la base de dato dado un identificador de una pregunta
 *
 * @param req
 * @param res
 * @param next
 */

exports.deleteIssue = (req,res,next)=>{

};
/**
 *Este metodo lo que hace es cargar la lista de issues dado un identificador de la pregunta y un estado del issues, lo que devuelve
 * es un json con la lista de todos los issues respectivo de una pregunta
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */

exports.LoadIssuebyState = (req,res,next)=>{

};
/**
 *Este metodo lo que hace es retornar la lista de todos las preguntas y cada una estara asociada la cantidad de issues
 * por estado : ej pregunta 1 issues 12 estado revision
 * @param req
 * @param res
 * @param next
 */

exports.loadListaIssuesByState = (req,res,next)=>{

};

/**
 * Este metodo lo que hace es cargar la lista de cambios que ha sufrido una pregunta desde el repositorio
 * de github; se debe realizar peticiones a github
 * @param req
 * @param res
 * @param next
 */

exports.loadHistoryChange = (req,res,next)=>{

};

/**
 *Guardo un comentarios referente a una pregunta
 *
 * @param req
 * @param res
 * @param next
 */

exports.guardarComentarios = (req,res,next)=>{

};

/**
 *Realizo un cambio sobre una pregunta
 *
 * @param req
 * @param res
 * @param next
 */
exports.editarComentarios = (req,res,next)=>{

};

/***
 *
 *Elimino un comentarios recibiendo como parametro un identificador de una pregunta
 * @param req
 * @param res
 * @param next
 */

exports.eliminarComentarios = (req,res,next)=>{

};

/**
 * enlista todos los comentarios referente a una pregunta
 * @param req
 * @param res
 * @param next
 */

exports.listarComentarios = (req,res,next)=>{

};