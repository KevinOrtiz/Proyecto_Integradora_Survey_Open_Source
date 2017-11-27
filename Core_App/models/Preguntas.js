const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntaSchema = new Schema({
    identificador:String,
    descripcion:{
        type:String,
        validate:{
            validator:(descripcion)=>descripcion.length>5,
            message: 'La descripcion debe tener mas de una palabra'
        },
        required:[true, 'La descripcion es necesaria,le da contexto a la pregunta']
    },
    usuario_ID:{
        type:Number,
        validate:{
            validator:(usuario_ID)=>usuario_ID.length!=null,
            message:'El ID del usuario debe ser numerico y diferente de cero'
        },
        required:[true,'Es necesario conocer el ID del creador de la pregunta']
    },
    etiquetas:[{
        texto:String,
        color:String
    }],
    topicos:[{
        texto:String
    }],
    respuestas:[{
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

const Pregunta = mongoose.model('pregunta',PreguntaSchema);

module.exports = Pregunta;
