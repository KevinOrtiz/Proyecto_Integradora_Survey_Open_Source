'use strict';
const CONTROLLERENCUESTAS = require('./controllers/Encuestas');
const CONTROLLERPREGUNTAS = require('./controllers/Preguntas');
const cacheHandled = require('cache');
/**
 * definir un middleware de rutas
 * Cuando un usuario quiera comunicarse con el servicio rest debera estar previamente autenticado en la aplicacion
 * y todos los requerimientos que envie el usuario debera existir un token
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var apiRoute = express.Router();

module.exports = (app)=> {

    /**
     * Autenticacion: Creacion de tokens,validacion de tokens
     */
    apiRoute.post('/generarToken',function(req,res,next){
        const payload = {
            //este requerimiento se lo envia desde el backend de django cuando el usuario se autentique
            user : req.body.userName
        };
        var token = jwt.sign(payload,app.get('superSecret'),{
             expiresIn: 86400
        });
       return res.json({
           success:true,
           token:token
        });
    });


    apiRoute.use(function (req,res,next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,app.get('superSecret'),function (err,decoded) {
                if(err){
                    return res.json({success:false,message:'Verificacion erronea'})
                }
                else{
                    req.decoded = decoded
                    next();
                }
            })
        }
        else{
            // este mensaje aparecera si el usuario no esta autenticado en la plataforma
            return res.status(403).send({
               success:false,
               message:'Requerimiento no autorizado, token inexistente'
            });

        }
    });


    /**
     * Todos estos endpoint solo funcionaran si el usuario envia el token de autenticacion
     * para hacer las peticiones
     * endPoint Encuesta
     *
     */
   apiRoute.post('/crearEncuesta',CONTROLLERENCUESTAS.crear);
   apiRoute.get('/editarEncuesta',CONTROLLERENCUESTAS.editar);
   apiRoute.delete('/eliminarEncuesta',CONTROLLERENCUESTAS.eliminar);
   apiRoute.get('cargarEncuestas',CONTROLLERENCUESTAS.listEncuestas);
   apiRoute.get('cargarQueryEncuestas',CONTROLLERENCUESTAS.QueryEncuestas);
   apiRoute.post('/crearIssueEncuesta',CONTROLLERENCUESTAS.crearIssue);
   apiRoute.get('/editarEstadoIssueEncuesta',CONTROLLERENCUESTAS.editarStateIssue);
   apiRoute.delete('/eliminarIssueEncuesta',CONTROLLERENCUESTAS.deleteIssue);
   apiRoute.get('/cargarIssueByStateEncuesta',CONTROLLERENCUESTAS.LoadIssuebyState);
   apiRoute.get('/cargarListaIssuesByStateEncuesta',CONTROLLERENCUESTAS.loadListaIssuesByState);
   apiRoute.get('/cargarHistorialCambiosEncuesta',CONTROLLERENCUESTAS.loadHistoryChange);
   apiRoute.post('/guardarComentarioEncuesta',CONTROLLERENCUESTAS.guardarComentarios);
   apiRoute.get('/editarComentarioEncuesta',CONTROLLERENCUESTAS.editarComentarios);
   apiRoute.delete('/eliminarComentarioEncuesta',CONTROLLERENCUESTAS.eliminarComentarios);
   apiRoute.get('/listarComentariosByEncuesta',CONTROLLERENCUESTAS.listarComentarios);



    /**
     * endPoint Preguntas
     *
     *
     */

   apiRoute.post('/crearPregunta',CONTROLLERPREGUNTAS.crear);
   apiRoute.get('/editarPregunta',CONTROLLERPREGUNTAS.editar);
   apiRoute.get('cargarPreguntas',CONTROLLERPREGUNTAS.listPreguntas);
   apiRoute.get('cargarQueryPreguntas',CONTROLLERPREGUNTAS.QueryPreguntas);
   apiRoute.post('/crearIssuePreguntas',CONTROLLERPREGUNTAS.crearIssue);
   apiRoute.get('/editarEstadoIssuePregunta',CONTROLLERPREGUNTAS.editarStateIssue);
   apiRoute.delete('/eliminarIssuePregunta',CONTROLLERPREGUNTAS.deleteIssue);
   apiRoute.get('/cargarIssueByStatePregunta',CONTROLLERPREGUNTAS.LoadIssuebyState);
   apiRoute.get('/cargarListaIssuesByStatePregunta',CONTROLLERPREGUNTAS.loadListaIssuesByState);
   apiRoute.get('/cargarHistorialCambiosPregunta',CONTROLLERPREGUNTAS.loadHistoryChange);
   apiRoute.post('/guardarComentarioPregunta',CONTROLLERPREGUNTAS.guardarComentarios);
   apiRoute.get('/editarComentarioPregunta',CONTROLLERPREGUNTAS.editarComentarios);
   apiRoute.delete('/eliminarComentarioPregunta',CONTROLLERPREGUNTAS.eliminarComentarios);
   apiRoute.get('/listarComentariosByPregunta',CONTROLLERPREGUNTAS.listarComentarios);

   app.use('/apiRest/',apiRoute);


};