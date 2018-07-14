const express = require('express');
const routes = express.Router();
const loggedIn = require('./middleware/middleware').loggedIn;
const main = require('./controllers/main');


routes.get('/', main.index);

routes.post('/user', main.addUser);

routes.post('/login', main.doLogin);

routes.get('/admin', loggedIn, main.admin);

module.exports = routes;