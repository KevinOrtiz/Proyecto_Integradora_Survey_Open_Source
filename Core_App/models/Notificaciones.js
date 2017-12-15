const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    identificador:String,
    fecha_creacion:{
        type:Date
    },
    fecha_actualizacion:{
        type:Date
    },
    leido:{
        type:Boolean,
        default: false
    },
    tipo:{
        type:String
    },
    descripcion: String,
});


const notificaciones = mongoose.model('notificacion',notificacionSchema);

module.exports = notificaciones;
