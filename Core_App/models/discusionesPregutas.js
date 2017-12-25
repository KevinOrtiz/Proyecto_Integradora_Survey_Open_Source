const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discusionPreguntaSchema = new Schema({
    identificador:String,
    titulo:String,
    descripcion:String,
    creador_ID:String,
    etiquetas:[{
        texto:{
            type:String
        }
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


discusionPreguntaSchema.virtual('numeroComentariosDiscusionesPreguntas').get(()=>{
   return this.comentarios.length;
});


discusionPreguntaSchema.virtual('numeroEtiquetasDiscusionesPreguntas').get(()=>{
   return this.etiquetas.length;
});

discusionPreguntaSchema.virtual('listaEtiquetasDiscusionesPreguntas').get(()=>{
   return this.etiquetas;
});

discusionPreguntaSchema.virtual('numeroEstadosDiscusionesPreguntas').get(()=>{
   return this.estados.length;
});

discusionPreguntaSchema.virtual('listaEstadosDiscusionesPreguntas').get(()=>{
   return this.estados;
});

discusionPreguntaSchema.virtual('mostrarIDPregunta').get(()=>{
   return this.pregunta_ID;
});


const discusionPregunta = mongoose.model('discusionPregunta',discusionPreguntaSchema);

module.exports = discusionPregunta;
