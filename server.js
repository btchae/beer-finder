///REQUIREMENTS
var express = require('express');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//CONTROLLERS
var beersController = require('./controllers/beers.js');
app.use('/beers', beersController)

//LISTEN
app.listen(port);
console.log('=============================');
console.log('Our band name is PORT:' + port);
console.log('=============================');
// console.log(process.env.BEER_KEY); <===Important to hide keys)