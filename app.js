'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var user_router = require('./route/userRouter');
var login = require('./route/loginRoute');
var app = express();

// Configuracion para parsear el body a json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// seteamos el header para el CORS
app.use((rep, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

// rutas
app.use('/api', user_router);
app.use('/api', login);

// ruta de ejemplo
app.get('/example', (rep, res) => {
    res.status(200).send("<h1>Bienvenido al ejemplo de node con Angular</h1>");
})

module.exports = app;