const mongoose = require('mongoose');
const config = require("../config");
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
