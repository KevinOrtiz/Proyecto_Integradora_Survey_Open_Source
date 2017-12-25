const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');

const PreguntaSchema = new Schema({
    identificador:String,
    descripcion:String,
    usuario_ID: String,
    historial_cambios:[{
        texto:String
    }],
    registroActual:Boolean,
    listaImagen:[{
        url: String
    }],
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

PreguntaSchema.virtual('numeroRespuestaPregunta').get(()=>{
   return this.respuestas.length;
});

PreguntaSchema.virtual('numeroComentariosPregunta').get(()=>{
   return this.comentarios.length;
});

PreguntaSchema.virtual('numeroDiscusionesPregunta').get(()=>{
    return this.discusiones.length;
});

PreguntaSchema.virtual('numeroEtiquetasPregunta').get(()=>{
   return this.etiquetas.length;
});

PreguntaSchema.virtual('numeroTopicosPreguntas').get(()=>{
   return this.topicos.length;
});

PreguntaSchema.virtual('listaTopicosPreguntas').get(()=>{
   return this.topicos;
});

PreguntaSchema.virtual('listaEtiquetasPreguntas').get(()=>{
   return this.etiquetas;
});
PreguntaSchema.index({topicos:'text'});
PreguntaSchema.plugin(pagination);

const Pregunta = mongoose.model('pregunta',PreguntaSchema);

module.exports = Pregunta;
