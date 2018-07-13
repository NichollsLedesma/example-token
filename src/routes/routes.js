const express = require('express');
const routes = express.Router();
const mid=require('./../middleware/middleware');
const jwt = require('jsonwebtoken');

const passtoken ='LaPassSecret';

routes.get('/', (req, res) => {
    res.render('index');
});

routes.post('/login', (req, res) => {
    let {username, password} = req.body;
    console.log('sadsda', req.body);
    if (username !=='nico' || password !== 'asd') res.send('ña ña ña ña');

    let data = {
        username: username,
        apellido: "Ledesma",
        nombre: "Nicolás Maximiliano",
        dni: 36025898
    }
    let token = jwt.sign(data, passtoken, {
        expiresIn: 60 *10 // 10 min
    });
    res.send(token);
});

routes.get('/admin', mid.loggedIn, (req,res)=>{
    let token=req.token;
    jwt.verify(token, passtoken, (err, user)=>{
        (err) ?
            res.status(401).send({ error: "Token inválido." }) :
            res.send(user);

    });



});

module.exports = routes;