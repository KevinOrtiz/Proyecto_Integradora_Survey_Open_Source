let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3232;
const usuarios = require("./controllers/usuarios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.route("/crearUsuario")
    .post(usuarios.crearUsuario);

app.route("/editarUsuario")
    .post(usuarios.editarInformacionUsuario);
    
app.route("/cargarPerfilUsuario/:id")
    .get(usuarios.cargarPerfilUsuario);
  
app.route("/cargarNotificaciones")
    .get(usuarios.cargarNotificaciones)    

app.listen(port);

module.exports = app;
