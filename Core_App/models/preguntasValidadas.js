const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pagination = require('mongoose-paginate');


const PreguntaValidadasSchema = new Schema({
    descripcion:{
        type:String
    },
    usuario_ID:{
        type:String, index: true
    },
    etiquetas:{
        texto:String
    },
    listaImagen:[{
        url: String
    }],
    fecha_creacion:{
        type: Date, default: Date.now, index: true
    },
    topicos:{
        texto: String
    },
    respuestas:[{
        id: String,
        texto:String,
        tipoRespuesta:String
    }]
});


PreguntaValidadasSchema.index({'topicos':'text'})
PreguntaValidadasSchema.plugin(pagination);
const PreguntaValidadas = mongoose.model('preguntaValidadas',PreguntaValidadasSchema);

module.exports = PreguntaValidadas;
