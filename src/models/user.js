const mongoose =require('mongoose');

const user = new mongoose.Schema({
    apellido: String,
    nombre: String,
    nick: String,
    pass: String
});

module.exports = mongoose.model('User', user);