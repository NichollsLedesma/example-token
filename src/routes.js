const express = require('express');
const routes = express.Router();
const loggedIn = require('./middleware/middleware').loggedIn;
const main = require('./controllers/main');


routes.get('/', main.index);

routes.post('/user', main.addUser);
routes.get('/user', main.usuario);


routes.post('/login', main.doLogin);
routes.get('/login', main.login);

routes.get('/admin', loggedIn, main.admin);
routes.post('/admin', loggedIn, main.admin);

module.exports = routes;