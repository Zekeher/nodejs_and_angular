var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

// en esta funcion nos logeamos con un usuario
function login(req, res) {
    var params = req.body;

    var username = params.username;
    var password = params.password;
    var token = params.gethash; // para generar el token ( gethash = true)

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).send("No se pudo logear");
        } else {
            if (!user) {
                res.status(404).send("No se encontro el usuario" + user);
            } else {
                bcrypt.compare(password, user.password, function(err, pass) {
                    if (pass) {
                        if (token) {
                            // Generamos un token para el usuario
                            res.status(200).send({ value: jwt.createToken(user) });
                        } else {
                            res.status(200).send(user);
                        }
                    } else {
                        res.status(404).send("La password ingresada es incorrecta");
                    }
                })
            }
        }
    });
}

module.exports = {
    login
};