const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/routes');

// config
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