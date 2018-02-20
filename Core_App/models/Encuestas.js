const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');

const EncuestaSchema = new Schema({
    identificador:{type:Number, default:0},
    titulo:String,
    descripcion:String,
    usuario_ID:{type: String, index:true},
    fecha_creacion:{type: Date, default: Date.now, index: true},
    fecha_edicion:{type: Date, default: Date.now, index: true},
    colaboradores:[{   
        type:Schema.Types.ObjectId,
        ref:'colaborador'
    }],
    historial_cambios:[String],
    registroActual:{type: Boolean, index: true},
    etiqueta:[{
        texto: String
    }],
    contenido_multimedia:{
       url:{
           type:String
       },
       tipo:{
           type:String, index: true
       }
    },
    preguntas:[{
        type:Schema.Types.ObjectId,
        ref:'preguntaValidadas'
    }],
    discusiones:[{
        type:Schema.Types.ObjectId,
        ref:'discusionEncuesta'
    }],
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'comentario'
    }]
});




EncuestaSchema.index({'etiqueta.texto': 'text'});
EncuestaSchema.plugin(pagination);
const Encuesta = mongoose.model('encuesta',EncuestaSchema);

module.exports = Encuesta;
