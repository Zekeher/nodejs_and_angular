'use strict'
// Aca definimos las rutas que van a determinar cada funcion diferente que generamos en userControllers ( CRUD )

var express = require('express');
var LoginController = require('../controllers/loginControllers');

var api = express.Router();

// en esta ruta logiamos con el usuario
api.post('/login', LoginController.login);

module.exports = api;