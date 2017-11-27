'use strict';
const redis = require('redis');
const PORT_REDIS = process.env.REDIS_PORT;

const clientRedis= redis.createClient(PORT_REDIS);

clientRedis.on('connect',()=>{
    console.log("conectado a redis server")
});

clientRedis.on('error',(error)=>{
    console.log("Hubo un error en la conexion con redis server "+ error);
});



