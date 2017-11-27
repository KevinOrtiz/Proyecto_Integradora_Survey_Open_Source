const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.database);
const assert = require('assert');
mongoose.connection
        .once('open',()=>{console.log('Conexion correcta a la base de datos!')})
        .on('error',(error)=>{
           console.warn('Warning',error);
        });

describe('proponiendo una pregunta',()=>{
    it('conectarse a un repositorio en github',()=>{

    });
    it('guardar una pregunta en la base de datos',()=>{

        it('existe en la base de datos local',()=>{

        });
        it('existe en el repositorio en github',()=>{
            it('existe esa pregunta en cache',()=>{

            });
            it('guardar la pregunta en mongoDB con estado issue revision',()=>{

            });
        });
    });


});