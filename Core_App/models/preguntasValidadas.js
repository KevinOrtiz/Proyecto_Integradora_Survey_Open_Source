const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntaValidadasSchema = new Schema({
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
        type:String,
        validate:{
            validator:(usuario_ID)=>usuario_ID.length!=null,
            message:'El ID del usuario debe ser numerico y diferente de cero'
        },
        required:[true,'Es necesario conocer el ID del creador de la pregunta']
    },
    etiquetas:[{
        texto:{
            type:String
        },
        color:{
            type:String
        }
    }],
    topicos:[{
        texto:{
           type:String
        }
    }],
    respuestas:[{
        texto:{
            type:String
        },
        tipoRespuesta:{
            type:String
        }
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
