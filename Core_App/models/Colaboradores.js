const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usuarios = require("./Usuarios");
const encuestas = require("./Encuestas");

const colaboradorSchema = new Schema({
    identificador:String,
    mensajes:String,
    listaUsuarios: [{
        type:Schema.Types.ObjectId,
        ref:'usuario'
    }],
    listaEncuestas: [{
        type:Schema.Types.ObjectId,
        ref:'encuesta'
    }]    
});

colaboradorSchema.virtual('obtenerCantidadUsuarios').get(()=>{
    return this.usuarios.length;
});

colaboradorSchema.virtual('obtenerCantidadEncuestas').get(()=>{
    return this.encuestas.length;
});

colaboradorSchema.virtual('obtenerEncuesta').get(()=>{
    return this.encuestas;
});

colaboradorSchema.virtual('obtenerMensajeEncuesta').get(()=>{
    return this.mensajes;
});

const Colaborador = mongoose.model('colaborador',colaboradorSchema);

module.exports = Colaborador;



