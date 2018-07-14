const express = require('express');
const routes = express.Router();
const loggedIn=require('./../middleware/middleware').loggedIn;
const jwt = require('jsonwebtoken');
const User = require('./../models/user');


const passtoken ='LaPassSecret';

routes.get('/', (req, res) => {
    res.render('index');
});

routes.post('/login', async (req, res) => {
    let {username, password} = req.body;
    let encontrado=await User.find({nick: username, pass: password});

    if(encontrado.length===0) res.send('Usuario no encontrado');

    let laData = {
        username: username,
        apellido: encontrado[0].apellido,
        nombre: encontrado[0].nombre
    }
    let token = jwt.sign(laData, passtoken, {
        expiresIn: 60 * 10 // 10 min
    });
    res.send(token);
    
});
routes.post('/user', async (req, res)=>{
    let user=new User(req.body);
    let elUser=await user.save();
    res.send(elUser);

});

module.exports = routes;