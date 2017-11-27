const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const comentarioSchame = new Schame({
   identificador:String,
   creador:{
       nombre:String,
       ID:Number
   },
   contenido:String,
   fecha_creacion:String,
   fecha_actualizacion:String,
   likes:Number,
   dislikes:Number,
   favoritos:Number,
   listaSubComentarios:[{
        type:Schame.Types.ObjectId,
        ref:'comentario'
   }]
});


comentarioSchame.virtual('numeroSubcomentarios').get(()=>{
   return this.listaSubComentarios.length;
});


const Comentario = mongoose.model('comentario',comentarioSchame);

module.exports = Comentario;