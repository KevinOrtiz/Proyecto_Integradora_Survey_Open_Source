const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colaboradorSchema = new Schema({
    mensajes:String,
    usuarioColaborador:{
        type:Schema.Types.ObjectId,
        ref:'usuario',
        index: true
    },
    listaEncuestas: [{
        type:Schema.Types.ObjectId,
        ref:'encuesta',
        index: true
    }]    
});


const Colaborador = mongoose.model('colaborador',colaboradorSchema);

module.exports = Colaborador;



