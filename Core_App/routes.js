'use strict';
const usuarios = require("./controllers/usuarios");
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
    
    apiRoute.get('/cargarPerfil',usuarios.cargarPerfilUsuario);
    apiRoute.get('/cargarColaboradores',usuarios.cargarColaboradores);
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

    

   app.use('/apiRest',apiRoute);


};