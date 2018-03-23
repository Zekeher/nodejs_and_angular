'user strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "yatusabes";

// Aca generamos un Token para el usuario que esta logeado
exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        mail: user.mail,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};