const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    usuario_emisor:[{
                    type:Schema.Types.ObjectId,
                    ref:'usuario', 
                    index: true
                    }],
    fecha_creacion:{
        type:Date,
        default: Date.now,
        index: true
    },
    tipo:{
        type:String, index: true
    },
    descripcion: String,
});


const notificaciones = mongoose.model('notificacion',notificacionSchema);

module.exports = notificaciones;
