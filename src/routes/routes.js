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
    let userLog = await User.find({nick: username, pass: password});
    console.log('usuario logueado',userLog);

    if(userLog.length===0) res.send('Usuario no encontrado');

    await (()=>{
        let data = {
            username: username,
            apellido: userLog.apellido,
            nombre: userLog.nombre
        }
        let token = jwt.sign(data, passtoken, {
            expiresIn: 60 *10 // 10 min
        });
        res.send(token);
    });
});
routes.post('/user', async (req, res)=>{
    let user=new User(req.body);
    let elUser=await user.save();
    res.send(elUser);

})
routes.get('/admin', loggedIn, (req,res)=>{
    let token=req.token;
    jwt.verify(token, passtoken, (err, user)=>{
        (err) ?
            res.status(401).send({ error: "Token inválido." }) :
            res.send(user);

    });



});

module.exports = routes;