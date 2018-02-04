const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        default: 'WITHOUT NAME',
        index: true
    },
    apellido:{
        type: String,
        default: "WITHOUT LASTNAME",
        index: true
    },
    correo:{
        type: String,
        default: 'nullUsuario@gmail.com',
        index: true
    },
    urlImage:String,
    historialLogin:[
        {
            actividad:{
                type: String,
                default: 'No ha usado la plataforma',
            },
            fecha_entrada:{
                type: Date, default: Date.now 
            },
            fecha_salida:{
                type: Date, default: Date.now
            }
        }
    ],
    roles:[{
        rol:{
            type: String
        },
        Acciones:[
            {
                type:String
            }
        ]
    }],
    institucion: {type: String, default:"sin definir"},
    grado_academico: {type: String, default:"sin definir"},
    area_academica: {type: String, default: 'sin definir'},
    colaboradores: [{
        type:Schema.Types.ObjectId,
        ref:'colaborador'
    }],
    notificaciones: [{
        type:Schema.Types.ObjectId,
        ref:'notificacion'
    }]
});

usuarioSchema.index({'nombre': 'text'});
usuarioSchema.plugin(pagination);
const Usuario = mongoose.model('usuario',usuarioSchema);

module.exports = Usuario;
