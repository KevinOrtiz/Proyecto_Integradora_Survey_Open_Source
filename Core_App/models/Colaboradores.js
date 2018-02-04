const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colaboradorSchema = new Schema({
    rol: String,
    usuarioColaborador:{
        type:Schema.Types.ObjectId,
        ref:'usuario',
    },
    encuestaCompartida: {
        type:Schema.Types.ObjectId,
        ref:'encuesta',
    }    
});


const Colaborador = mongoose.model('colaborador',colaboradorSchema);

module.exports = Colaborador;



