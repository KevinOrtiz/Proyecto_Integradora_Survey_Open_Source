const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    nombre:{
        type: String,
        default: 'WITHOUT NAME'
    },
    apellido:{
        type: String,
        default: "WITHOUT LASTNAME"
    },
    correo:{
        type: String,
        default: 'nullUsuario@gmail.com'
    },
    urlImage:String,
    historialLogin:[
        {
            actividad:{
                type: String,
                default: 'No ha usado la plataforma',
            },
            fecha_entrada:{
                type: Date
            },
            fecha_salida:{
                type: Date
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
    colaboradores: [{
        type:Schema.Types.ObjectId,
        ref:'colaborador'
    }],
    notificaciones: [{
        type:Schema.Types.ObjectId,
        ref:'notificacion'
    }]
});

usuarioSchema.virtual('obtenerNombreApellido').get(()=>{
    return `${this.nombre} + ${this.apellido}`;
});

usuarioSchema.virtual('obtnerCorreo').get(()=>{
    return this.correo;
});


usuarioSchema.virtual('obtenerHistorial').get(()=>{
    return this.historialLogin;
});

usuarioSchema.virtual('obtenerCantidadRoles').get(()=>{
    return this.roles.length;
});

usuarioSchema.virtual('obtenerRoles').get(()=>{
    return this.roles;
});

usuarioSchema.virtual('obtenerCantidadColaboradores').get(()=>{
    return this.listaColaboradores.length;
});

usuarioSchema.virtual('obtenerColaboradores').get(()=>{
    return this.listaColaboradores;
});

usuarioSchema.virtual('obtenerCantidadNotificacionesNoLeidas').get(()=>{
    const contador = 0;
    for (const valor of this.listaNotificaciones) {
        if( valor.leido == false){
            contador = contador + 1;
        }
    }
    
    return contador;
});

usuarioSchema.virtual('obtenerNotificacionesNoLeidas').get(()=>{
    const lista = [];
    for (const valor of this.listaNotificaciones) {
        if( valor.leido == false){
            lista.push(valor);
        }
    }
    
    return lista;

});

const Usuario = mongoose.model('usuario',usuarioSchema);

module.exports = Usuario;
