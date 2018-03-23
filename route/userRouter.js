'use strict'
// Aca definimos las rutas que van a determinar cada funcion diferente que generamos en userControllers ( CRUD )

var express = require('express');
var api = express.Router();
var UserController = require('../controllers/usersControllers');
var auth = require('../middlewares/autheticated');
var multipart = require('connect-multiparty');
var upload = multipart({ uploadDir: './uploads/images' });

// en esta ruta leemos todos los usuarios
api.get('/users', auth.ensureAuth, UserController.getAllUsers);

// en esta ruta vamos a leer un usuario
api.get('/users/:id', auth.ensureAuth, UserController.getUser);

// en esta ruta vamos a actualizar un usuario
api.put('/users/update/:id', auth.ensureAuth, UserController.updateUser);

// en esta ruta vamos a eliminar un usuario
api.delete('/users/delete/:id', auth.ensureAuth, UserController.deleteUser);

// en esta ruta vamos a subir una imagen a un usuario
api.post('/users/update/:id/image', [auth.ensureAuth, upload], UserController.updateImage);

// en esta ruta vamos a leer un usuario
api.get('/users/img/:imageFile', UserController.getImageFile);

// en esta ruta registramos un usuario
api.post('/register', UserController.createUser);

module.exports = api;