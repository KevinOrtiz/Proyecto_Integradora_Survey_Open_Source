const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discusionPreguntaSchema = new Schema({
    titulo:String,
    descripcion:String,
    creador_ID:{type: String, index: true},
    etiquetas:[{
        type: String
    }],
    estados:[{
       usuario_ID:{
           type:String
       },
       texto:{
           type:String
       }
    }],
    fecha_creacion:String,
    fecha_cierre:String,
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'comentario'
    }],
    pregunta_ID:String
});




const discusionPregunta = mongoose.model('discusionPregunta',discusionPreguntaSchema);

module.exports = discusionPregunta;
