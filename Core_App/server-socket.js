const express = require('express')
const app = express()
const config = require('./config');
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const notificacion = require("./controllers/notificaciones");
var redis = require('redis');
var client = redis.createClient();
const http = require('http').Server(app);
var io = require('socket.io')(http)



client.on("error", function (error) {
    console.log('error en la conexion de la base de datos');
    console.log(error);
});


port = process.env.PORT || 3001;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseDevelopment, {
    useMongoClient: true
});

mongoose.connection
    .once('open', () => {
        console.log("conexion exitosa a la base de datos")
    })
    .on('error', (error) => {
        console.log("WARNING", error)
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

http.listen(3001, () => {
    console.log('iniciado');
})

io.on('connection', (socket) => {
    console.log('un usuario se ha conectado');
    client.get(socket.handshake.query.id, (err, reply) => {
      if (err) {
        console.log('existio un error con la conexion');
        console.log(err);
        } else {
           client.set(socket.handshake.query.id,socket.id);
    }

})
    socket.on('disconnect', () => {
        console.log('un usuario se ha desconectado')
        console.log(socket.handshake.query.id)
        client.del(socket.handshake.query.id, (err, obj) => {
            if (err) {
                console.log(err);
            }
            console.log(obj);
        });
    });

    socket.on('recibir-accion', (accion) => {
        client.get(accion.receptor, (err, obj) => {
          if (err) {
             console.log('problemas con el envio de informacion');
             console.log(err);
            } else {
               notificacion.setAcciones(socket, accion, obj,io);
            }
        });
    });

});

