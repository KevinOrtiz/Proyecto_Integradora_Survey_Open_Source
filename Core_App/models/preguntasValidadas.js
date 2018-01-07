const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntaValidadasSchema = new Schema({
    identificador:String,
    descripcion:{
        type:String
    },
    usuario_ID:{
        type:String
    },
    etiquetas:{
        texto:{
            type:String
        }
    },
    topicos:{
        texto:{
           type:String
        }
    },
    respuestas:[{
        id: String,
        texto:String,
        tipoRespuesta:String
    }],
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'comentario'
    }]
});

PreguntaValidadasSchema.virtual('numeroRespuestaPregunta').get(()=>{
   return this.respuestas.length;
});

PreguntaValidadasSchema.virtual('numeroComentariosPregunta').get(()=>{
   return this.comentarios.length;
});


PreguntaValidadasSchema.virtual('numeroEtiquetasPregunta').get(()=>{
   return this.etiquetas.length;
});

PreguntaValidadasSchema.virtual('numeroTopicosPreguntas').get(()=>{
   return this.topicos.length;
});

PreguntaValidadasSchema.virtual('listaTopicosPreguntas').get(()=>{
   return this.topicos;
});

PreguntaValidadasSchema.virtual('listaEtiquetasPreguntas').get(()=>{
   return this.etiquetas;
});

const PreguntaValidadas = mongoose.model('preguntaValidadas',PreguntaValidadasSchema);

module.exports = PreguntaValidadas;
