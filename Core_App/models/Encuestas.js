const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncuestaSchema = new Schema({
    identificador:String,
    titulo:String,
    descripcion:String,
    usuario_ID:String,
    fecha_creacion:String,
    fecha_edicion:String,
    colaboradores:[{
        colaborador_ID:{
            type:Number
        }
    }],
    historial_cambios:[{
        texto:{
            type:String
        }
    }],
    registroActual:Boolean,
    etiqueta:[{
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
       },
       color:{
           type:String
       }
    }],
    contenido_multimedia:[{
       url:{
           type:String
       },
       tipo:{
           type:String
       }
    }],
    preguntas:[{
        type:Schema.Types.ObjectId,
        ref:'pregunta'
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



EncuestaSchema.virtual('numeroPreguntasEncuesta').get(()=>{
   return this.preguntas.length;
});

EncuestaSchema.virtual('numeroComentariosEncuesta').get(()=>{
   return this.comentarios.length;
});

EncuestaSchema.virtual('numeroDiscusionesEncuesta').get(()=>{
    return this.discusiones.length;
});

EncuestaSchema.virtual('numeroEtiquetasEncuesta').get(()=>{
   return this.etiquetas.length;
});

EncuestaSchema.virtual('numeroTopicosEncuesta').get(()=>{
   return this.topicos.length;
});

EncuestaSchema.virtual('listaTopicosEncuesta').get(()=>{
   return this.topicos;
});

EncuestaSchema.virtual('listaEtiquetasEncuesta').get(()=>{
   return this.etiquetas;
});

const Encuesta = mongoose.model('encuesta',EncuestaSchema);

module.exports = Encuesta;
