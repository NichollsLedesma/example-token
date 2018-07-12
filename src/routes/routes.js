const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');

const passtoken ='LaPassSecret';

routes.get('/', (req, res) => {
    res.render('index');
});

routes.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (username != 'nico' && password != 'asd') res.send('ña ña ña ña');

    let data = {
        username: username,
        apellido: "Ledesma",
        nombre: "Nicolás Maximiliano",
        dni: 36025898
    }
    let token = jwt.sign(data, passtoken, {
        expiresIn: 60 // en segundos
    });
    res.send(token);
});

routes.get('/admin', (req,res)=>{
   let token = req.headers['authorization'];
   if(!token)
       res.status(401).send( { error: "Necesario el token para ingresar"  } );
   console.log(token);
   token=token.replace('Bearer','');

   jwt.verify(token, passtoken, (err, user)=>{
       (err) ?
           res.status(401).send({ error: "Token inválido." }) :
           res.send({ mensaje: 'good' });

   });

});

module.exports = routes;