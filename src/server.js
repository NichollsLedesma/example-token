const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


const routes = require('./routes/routes');

// config
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    .then(db=>console.log('Connected...'))
    .catch(err=>console.log('Error al conectar'));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'));

// routes
app.use('/', routes);

// run
app.listen(app.get('port'), ()=> {
    console.log('listennig to ' + app.get('port'));
});