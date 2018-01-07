'use strict'
const usuario = require("../models/Usuarios");
const jwt = require('jsonwebtoken');
const config = require("../config");
const momento = require('moment');
/**
 * Cuando un usuario se loguea a-traves de google o espol, 
 * se genera automaticamente un token que sera enviado al usario para que sea guardado en su session 
 * storage
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */

exports.crearUsuario = (req,resp,next)=>{
    if(validoDatosUsuario(req.body.usuario)){
        usuario.findOne({nombre:req.body.usuario.nombre,apellido:req.body.usuario.apellido})
        .then((response,err)=>{
            let token = definirToken(req.body.usuario);            
            if(err){
                return resp.json({"messaje":"error en la base de datos","status":500});
            }
            else if(!response){
                let nuevoUsuario = new usuario(req.body.usuario);
                nuevoUsuario.save((error)=>{
                    if(error){
                        return resp.json({"messaje":"existe un error en la BD en guardar la informacion","status":400});
                    }
                    else{
                        return resp.json({"messaje":"Nuevo usuario registrado en la aplicacion","token":token,"status":200,"_id":nuevoUsuario._id,"roles":nuevoUsuario.roles});                         
                    }
                });    
            }
            else{
                return resp.json({"messaje":"Usuario ya registrado en la aplicacion","token":token,"status":200,"_id":response._id,"roles":response.roles});                
            }

        }).catch((rejection)=>{
            console.log("Ha ocurrido un error en la funcion "+ rejection);
        });
        
    }
    else {
        return resp.json({"messaje":"el tipos de datos enviados no son correctos","status":407});
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next  
 */
exports.editarInformacionUsuario = (req,resp,next)=>{
    if(req.body.usuario._id){
            usuario.findOneAndUpdate({_id:req.body.usuario._id},
            {$set: {nombre: req.body.usuario.nombre,
            apellido: req.body.usuario.apellido,
            correo: req.body.usuario.correo,
            genero: req.body.usuario.genero,
            urlImage: req.body.usuario.urlImage,
            'historialLogin.$.actividad' : req.body.usuario.historialLogin.actividad, 
            'historialLogin.$.fecha_entrada': req.body.usuario.historialLogin.fecha_entrada,
            'historialLogin.$.fecha_salida': req.body.usuario.historialLogin.fecha_salida}},
            {new: true}).then((usuario,err)=>{
                console.log(usuario);
                if(err){
                    return resp.json({"messaje":"error en actualizar en la base de datos","status":500});
                }
                else if(usuario){
                    return resp.json({"messaje":"usuario actualizado","data":usuario,"status":200});  
                }
                else{
                    return resp.json({"messaje":"es un usuario nuevo","status":200});                      
                }

            }).catch((rejection)=>{
                console.log(rejection);
            })
            
    }
    else {
        return resp.json({"messaje":"el identificador del usuario no puede ser nulo","status":404});
        
    }

};

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */

exports.eliminarUsuario = (req,resp,next)=>{
    usuario.findOneAndRemove({idUsuario:req.params},(err,user)=>{
        if(err){
            return resp.status(500).send({"messaje":"hubo un problema en el servidor de Base de datos"});
        }
        return resp.status(200).send({"messaje":"usuarioEliminado"});
    });
}

exports.cargarPerfilUsuario = (req,resp,next)=>{
    usuario.findOne({_id:req.params})
            .populate('notificacion')
            .populate({
                path: 'colaborador',
                populate: {
                    path: 'usuario'
                },
                populate: {
                    path: 'encuesta'
                }
            })
            .then((datosUsuario,err)=>{
        if(err){
            return resp.status(500).send({"messajes":"error en la base de datos"});

        }
        else if(datosUsuario){
            return resp.status(200).send({"datos":datosUsuario});            
        }
        else{
            return resp.status(200).send({"datos":null,"messaje":"no existe determinado usuario"})
        }
    }).catch((rejection)=>{
        console.log("error en el metodo "+ rejection);
    });
};


/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */
exports.cargarNotificaciones = (req,resp,next)=>{
    if(req.body.usuario){
        usuario.findOne({_id:req.query.usuario._id})
        .populate('notificacion')
        .then((datosUsuario,err)=>{
            var instanceUsuario = new usuario(datosUsuario);
            if(err){
                return resp.status(500).send({"messajes":"error en la base de datos"});

            }
            else if(datosUsuario){
                return resp.status(200).send({"data":instanceUsuario.obtenerNotificacionesNoLeidas,"cantidad":instanceUsuario.obtenerCantidadNotificacionesNoLeidas});                
            }
            else{
                return resp.status(200).send({"data":null,"messajes":"usuario inexistente"});
                
            }
        }).catch((err)=>{
            console.log("Hubo un error en la ejecucion del query "+ err);
        });
    }
    else{
        return resp.status(404).send({"messaje":"no existe ningun Id del usuario"});

    }
} ;

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */
exports.cargarColaboradores = (req,resp,next)=>{
    if(req.body.usuario){
        usuario.findOne({_id: req.query.usuario._id})
        .populate({
            path: 'colaborador',
            populate: {
                path: 'usuario'
            },
            populate:{
                path:'encuesta'
            }
        })
        .then((datosUsuario,err)=>{
            var instanceUsuario = new usuario(datosUsuario);            
            if(err){
                return resp.status(500).send({"messajes":"error en la obtencion de datos"});
            }
            else if(datosUsuario){
                return resp.status(200).send({"dataColaboradores":instanceUsuario.obtenerColaboradores,"cantidad":instanceUsuario.obtenerCantidadColaboradores});                
            }
            else{
                return resp.status(200).send({"messajes":"no existe un usuario con determinado id"});
            }

        }).catch((err)=>{
            console.log("error en la ejecucion del query "+ err);
        });
    }
    else{
        return resp.status(404).send({"status":"el identificador no puede ser nulo"});

    }
};

/**
 * Esta funcion  lo que hace es validar que los datos que vienen del servidor sean del tipo correcto
 * Si uno de los parametros es incorrecto entonces retorna falso con la descripcion del tipo de dato incorrecto
 * @param {*} datosUsuario 
 */

let validoDatosUsuario = (datosUsuario)=>{ 
    var expCorreo = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(datosUsuario.nombre !== "" && datosUsuario.apellido !== "" && expCorreo.test(datosUsuario.correo) 
        && datosUsuario.correo !== "" && momento(datosUsuario.fecha_entrada).isValid() && momento(datosUsuario.fecha_salida).isValid()){
            return true
        }
    return false;
};


/**
 * 
 * @param {*} datosUsuario 
 */

let definirToken = (datosUsuario)=>{
    let payload = {
        user : datosUsuario.nombre + datosUsuario.apellido
    };
    var token = jwt.sign(payload,config.secret,{
         expiresIn: 86400
    });
    return token; 
};