'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

// En este controller vamos a tener un CRUD de usuarios
// En esta funcion obtenemos todos los usuarios
function getAllUsers(req, res) {
    User.find((err, users) => {
        if (err) {
            res.status(500).send("No se pudo traer los usuarios");
        } else {
            res.status(200).send(users);
        }
    });
}

// funcion para crear un usuario
function createUser(req, res) {
    var user = new User();
    var params = req.body;
    user.fname = params.fname;
    user.lname = params.lname;
    user.username = params.username;
    user.email = params.email;
    user.password = params.password;
    user.role = "view";
    user.image = null;
    // verificamos si ingreso una password para poderla encryptar y verificamos que las 2 password ingresadas son iguales
    if (params.password === params.password2) {
        // aca encryptamos la password
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            // aca verificamos que tengan los campos completos
            if (user.fname != null && user.lname != null && user.username != null && user.email != null) {
                User.findOne({ 'username': user.username }, (err, data) => {
                    if (err) {
                        res.status(500).send("Error: no se pudo verificar usuario");
                    } else {
                        if (!data) {
                            user.save((err, user) => {
                                if (err) {
                                    res.status(500).send("Error: no se pudo guardar el usuario")
                                } else {
                                    if (!user) {
                                        res.status(404).send("No se pudo registrar el usuario");
                                    } else {
                                        // aca vemos si se guardo el usuario exitosamente
                                        res.status(200).send(user);
                                    }
                                }
                            });
                        } else {
                            res.status(404).send("No se puede crear un usuario ya existente");
                        }
                    }
                });

            } else {
                res.status(200).send("Por favor complete todos los campos");
            }
        })

    } else {
        res.status(500).send("por favor ingrese una password")
    }
}

// en esta funcion obtenemos los datos de un usuario
function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, viewUser) => {
        if (err) {
            res.status(500).send("Error al solicitar el usuario");
        } else {
            if (!viewUser) {
                res.status(404).send("No se ha podido llamar el usuario");
            } else {
                res.status(200).send(viewUser);
            }
        }
    });
}

// en esta funcion actualizamos al usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, updateUser) => {
        if (err) {
            res.status(500).send("Error al actualizar el usuario");
        } else {
            if (!updateUser) {
                res.status(404).send("No se ha podido actualizar el usuario");
            } else {
                res.status(200).send(updateUser);
            }
        }
    });
}

// en esta funcion eliminamos el usuario
function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, deleteUser) => {
        if (err) {
            res.status(500).send("Error al eliminar el usuario");
        } else {
            if (!deleteUser) {
                res.status(404).send("No se ha podido eliminar el usuario");
            } else {
                res.status(200).send(deleteUser);
            }
        }
    });
}

// en esta funcion guardamos una imagen para el usuario
function updateImage(req, res) {
    var userId = req.params.id;
    var file_name
    var file = req.files;
    if (file) {
        var file_path = file.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_not_ext = ext_split[0];
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, imageUpdate) => {
                if (!imageUpdate) {
                    res.status(404).send("No se ha podido actualizar la imagen del usuario");
                } else {
                    res.status(200).send(imageUpdate);
                }
            })
        } else {
            res.status(500).send("La extension de la imagen no es correcta");
        }


    } else {
        res.status(200).send("No se cargo ninguna imagen");
    }
}

// en esta funcion vamos a leer las imagenes que queremos mostrar
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/images/' + imageFile;
    fs.exists(path_file, function(exits) {
        if (exits) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send("No existe la imagen...")
        }
    });
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateImage,
    getImageFile
}