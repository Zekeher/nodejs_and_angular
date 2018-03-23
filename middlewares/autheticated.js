'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "yatusabes";

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send("No esta autorizado para realizar esta peticion");
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload <= moment().unix()) {
            return res.status(404).send("El TOKEN vencio");
        }
    } catch (ex) {
        console.log("error: " + ex);
        return res.status(404).send("TOKEN no valido");
    }

    req.user = payload;

    next();
};