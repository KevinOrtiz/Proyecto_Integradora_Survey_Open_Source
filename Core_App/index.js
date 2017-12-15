const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const connectorGithub = require('github');
const app = express();


const github = new connectorGithub({
    debug:true,
    Promise: require('bluebird'),
    timeout:8000,
    host:'https://github.com/Open-Source-Survey-Community/Questions_Academic',
    pathPrefix: '/api/v3'
});


port = process.env.PORT || 3002;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseDevelopment,{
    useMongoClient: true
});
mongoose.connection
        .once('open',()=>{console.log("conexion exitosa a la base de datos")})
        .on('error',(error)=>{console.log("WARNING",error)});

app.set('superSecret',config.secret);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

require('./routes')(app);

app.listen(port);


console.log("Started Web service");

