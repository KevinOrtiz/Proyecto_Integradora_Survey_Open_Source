const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done)=>{

    mongoose.connect(config.databaseTesting,{
        useMongoClient: true
    });
    mongoose.connection
            .once('open',()=>{console.log("conexion exitosa a la base de datos")})
            .on('error',(error)=>{console.log("WARNING",error)});
    done()

});

beforeEach((done)=>{
    const {pregunta,encuesta,discusionEncuesta,discusionPregunta,comentario}=mongoose.connection.collections;
    encuesta.drop(()=>{
       pregunta.drop(()=>{
         comentario.drop(()=>{
            discusionEncuesta.drop(()=>{
               discusionPregunta.drop(()=>{
                  done();
               });
            });
         });
       });
    });

});