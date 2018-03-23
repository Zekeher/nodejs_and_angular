'use strick'

// Aca creamos un modelo o Schema para definir la estructura que va a tener el usuario

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String,
    role: String,
    image: String
});
// para relacionar una id con otra tabla de la base de datos debemos ingresar lo siguiente
/*
    Esto es un ejemplo
    relacionModel: { type: Schema.ObjectId, ref: 'NameModel'}
*/

module.exports = mongoose.model('User', UserSchema);