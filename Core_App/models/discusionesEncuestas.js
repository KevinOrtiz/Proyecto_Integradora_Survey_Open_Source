const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discusionEncuestaSchema = new Schema({
    identificador:String,
    titulo:String,
    descripcion:String,
    creador_ID:String,
    etiquetas:[{
        texto:{
            type:String
        }
    }],
    asignados:[{
        Usuario_ID:{
            type:Number
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


discusionEncuestaSchema.virtual('numeroComentariosDiscusionesEncuesta').get(()=>{
   return this.comentarios.length;
});


discusionEncuestaSchema.virtual('numeroEtiquetasDiscusionesEncuesta').get(()=>{
   return this.etiquetas.length;
});

discusionEncuestaSchema.virtual('listaEtiquetasDiscusionesEncuesta').get(()=>{
   return this.etiquetas;
});

discusionEncuestaSchema.virtual('numeroAsignadosDiscusionesEncuesta').get(()=>{
   return this.asignados.length;
});


discusionEncuestaSchema.virtual('listaAsignadosDiscusionesEncuesta').get(()=>{
   return this.asignados;
});

discusionEncuestaSchema.virtual('mostrarEstadosDiscusionesEncuesta').get(()=>{
   return this.estado;
});

discusionEncuestaSchema.virtual('mostrarIDEncuesta').get(()=>{
   return this.encuesta_ID;
});


const discusionEncuesta = mongoose.model('discusionEncuesta',discusionEncuestaSchema);

module.exports = discusionEncuesta;
