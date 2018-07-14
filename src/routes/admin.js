const express = require('express');
const routes = express.Router();
const loggedIn = require('./../middleware/middleware').loggedIn;
const jwt = require('jsonwebtoken');

const passtoken ='LaPassSecret';

routes.get('/', loggedIn, (req, res) => {
    let token = req.token;
    jwt.verify(token, passtoken, (err, user) => {
        (err) ?
            res.status(401).send({error: "Token inválido."}) :
            res.send(user);

    });
});

module.exports = routes;