const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');

const PreguntaSchema = new Schema({
    descripcion:String,
    usuario_ID: {type: String, index: true},
    historial_cambios:[{
        texto:{
            type: String, index: true
        }
    }],
    registroActual:{type:Boolean, index: true},
    listaImagen:[{
        url: String
    }],
    fecha_creacion:{type: Date, default: Date.now, index: true},
    fecha_actualizacion: {type: Date, default: Date.now, index:true},
    estado:{type: String, index: true, default: 'revision'},
    etiquetas:{
        texto: String
    },
    topicos:{
        texto: String
    },
    respuestas:[{
        id: String,
        texto:String,
        tipoRespuesta:String
    }],
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'comentario'
    }],
    discusiones:[{
       type:Schema.Types.ObjectId,
       ref:'discusionPregunta'
    }]
});


PreguntaSchema.index({'topicos' :'text'});
PreguntaSchema.plugin(pagination);

const Pregunta = mongoose.model('pregunta',PreguntaSchema);

module.exports = Pregunta;
