'use strict';
const usuarios = require("./controllers/usuarios");
const preguntas = require("./controllers/Preguntas");
const comentarios = require("./controllers/comentarios");
const discusion = require("./controllers/discusiones");
const encuesta = require("./controllers/Encuestas");
const notificacion = require("./controllers/notificaciones");

/**
 * definir un middleware de rutas
 * Cuando un usuario quiera comunicarse con el servicio rest debera estar previamente autenticado en la aplicacion
 * y todos los requerimientos que envie el usuario debera existir un token
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var apiRoute = express.Router();

module.exports = (app)=> {
    apiRoute.post('/crearUsuario',usuarios.crearUsuario);
    apiRoute.use(function (req,res,next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,app.get('superSecret'),function (err,decoded) {
                if(err){
                    return res.json({success:false,message:'Token de verificacion no valido'})
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
     * Endpoint para las operaciones de usuarios
     */
    
    apiRoute.get('/numeroAcciones',notificacion.loadNumeroAccionesUsuario);
    apiRoute.get('/numeroMensajes',notificacion.loadNumeroMensajesUsuarios);
    apiRoute.get('/cargarPerfil',usuarios.cargarPerfilUsuario);
    apiRoute.get('/cargarColaboradores',usuarios.cargarListaMisColaboradores);
    apiRoute.get('/cargarNotificaciones',usuarios.cargarNotificaciones);
    apiRoute.post('/editarInformacion',usuarios.editarInformacionUsuario);

    /**
     * Todos estos endpoint solo funcionaran si el usuario envia el token de autenticacion
     * para hacer las peticiones
     * endPoint Encuesta
     *
     */



    /**
     * endPoint Preguntas
     *
     *
     */
    apiRoute.post('/guardarPregunta',preguntas.crear);
    apiRoute.get('/verPregunta',preguntas.verPregunta);
    apiRoute.get('/listPreguntas',preguntas.listPreguntas);
    apiRoute.get('/queryPreguntas',preguntas.QueryPreguntas);
    apiRoute.post('/guardarComentario',comentarios.guardarComentario);
    apiRoute.post('/addPosts',comentarios.addPost);
    apiRoute.post('/addFavoritos',comentarios.addFavoritos);
    apiRoute.get('/loadListComentario',comentarios.loadListaComentario);
    apiRoute.post('/guardarDiscusion',discusion.guardarDiscusion);
    apiRoute.get('/loadListaDiscusion',discusion.loadListaDiscusiones);
    apiRoute.get('/loadListaMisDiscusiones',discusion.loadListaMisDiscusiones);
    apiRoute.get('/verDiscusionPregunta',discusion.loadMyDiscusion);
    apiRoute.post('/editarDiscusion',discusion.editMyDiscusion);
    apiRoute.get('/eliminarDiscusion',discusion.removeMyDiscusion);
    apiRoute.get('/loadListaMisPreguntas',preguntas.loadListaMisPreguntas);
    apiRoute.get('/listaDiscusionesByPregunta',discusion.loadListaDiscusionByPregunta);
    apiRoute.get('/eliminarPregunta', preguntas.removePregunta);
    apiRoute.get('/cerrarDiscusionPregunta',discusion.cerrarDiscusionPregunta);
    apiRoute.post('/validarPregunta',discusion.validarPregunta);
    apiRoute.get('/loadSummaryDiscusionesPregunta',usuarios.getDiscusionesByPreguntas);
    apiRoute.get('/loadSummaryCommentsByPreguntas',usuarios.loadFirstCommentsByPreguntas);
    apiRoute.get('/loadChartEncuestasByMonth',usuarios.getNumeroEncuestasByMonth);
    apiRoute.get('/loadSummaryPreguntasValidasNoValidas',usuarios.getNumeroPreguntasValidasNoValidasByMonth);
    apiRoute.get('/loadSummaryActivitiesByMonth',usuarios.getNumeroActividadesByMonth);
    apiRoute.get('/listEncuestas',encuesta.loadListaEncuestas);
    apiRoute.get('/queryEncuestas',encuesta.queryEncuestas);
    apiRoute.get('/getListaMyEncuestas',encuesta.loadListaMyEncuestas);
    apiRoute.get('/loadEncuesta',encuesta.cargarEncuesta);
    apiRoute.post('/guardarEncuesta',encuesta.guardarEncuesta);
    apiRoute.get('/getPreguntasValidas',encuesta.getListaPreguntasValidas);
    apiRoute.get('/loadListaMensajes',notificacion.loadListaMensajes);
    apiRoute.get('/loadListaAcciones',notificacion.loadListaAcciones);
    apiRoute.get('/loadFiveAcciones', notificacion.loadListaFiveAcciones);
    apiRoute.get('/loadFiveMensajes', notificacion.loadListaFiveMensajes);
    apiRoute.get('/deleteAllMyEncuestas',encuesta.deleteAllMyEncuestas);
    apiRoute.get('/deleteEncuesta', encuesta.deleteEncuestaByID);
    apiRoute.get('/loadListadoDiscusionesFromEncuesta',encuesta.loadListadoDiscusionesByEncuesta);
    apiRoute.post('/updateEncuesta',encuesta.updateMyEncuesta)
   app.use('/apiRest',apiRoute);


};