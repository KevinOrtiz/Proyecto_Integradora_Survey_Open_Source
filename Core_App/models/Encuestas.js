const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncuestaSchema = new Schema({
    identificador:String,
    titulo:String,
    descripcion:String,
    usuario_ID:Number,
    fecha_creacion:String,
    fecha_edicion:String,
    colaboradores:[{
        colaborador_ID:Number
    }],
    etiqueta:[{
       texto:String,
       color:String
    }],
    topicos:[{
       texto:String,
       color:String
    }],
    contenido_multimedia:[{
       url:String,
       tipo:String
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
