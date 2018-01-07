const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    usuario_emisor:String,
    usuario_receptor:String,
    fecha_creacion:{
        type:Date,
        default: Date.now 
    },
    tipo:{
        type:String
    },
    descripcion: String,
});


const notificaciones = mongoose.model('notificacion',notificacionSchema);

module.exports = notificaciones;
