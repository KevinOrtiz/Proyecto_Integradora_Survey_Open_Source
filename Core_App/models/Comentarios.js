const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const comentarioSchame = new Schame({
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
   likes:{type: Number, default: 0},
   dislikes:{type: Number, default: 0},
   favoritos:{type: Number, default: 0},
   listaSubComentarios:[{
        type:Schame.Types.ObjectId,
        ref:'comentario'
   }]
});




const Comentario = mongoose.model('comentario',comentarioSchame);

module.exports = Comentario;