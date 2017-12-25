const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const comentarioSchame = new Schame({
   identificador:String,
   creador:{
       nombre:{
           type:String
       },
       ID:{
           type:String
       }
   },
   contenido:String,
   fecha_creacion:{ type: Date, default: Date.now },
   fecha_actualizacion:{ type: Date, default: Date.now },
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