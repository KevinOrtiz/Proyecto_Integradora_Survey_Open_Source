const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');



const discusionEncuestaSchema = new Schema({
    titulo:String,
    descripcion:String,
    creador_ID:{type: String, index: true},
    etiquetas:[{
            type:String
    }],
    asignados:[{
        Usuario_ID:{
            type:String, index: true
        },
        tipo:{
            type:String
        }
    }],
    estado:String,
    fecha_creacion:String,
    fecha_cierre:String,
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'comentario'
    }],
    encuesta_ID:String
});


discusionEncuestaSchema.index({'etiquetas':'text'});
discusionEncuestaSchema.plugin(pagination);
const discusionEncuesta = mongoose.model('discusionEncuesta',discusionEncuestaSchema);

module.exports = discusionEncuesta;
