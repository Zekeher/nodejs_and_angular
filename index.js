'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

// Aca se conecta a la base de datos
mongoose.connect('mongodb://localhost:27017/example_node_angular', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Se conecto a la base de datos - OK");
        app.listen(port, function() {
            console.log("Servidor api rest de express - OK");
        });
    }
});