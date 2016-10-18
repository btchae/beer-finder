var express = require('express');
var router = express.Router();
var request = require('request');
// console.log('beer'); <---Was used to test pathing of the controller
//TEST CONTROLLER
router.get('/', function(req, res) {
  console.log('testing controller');
});

router.get('/search', function(req, res) {
  console.log('testing search');
  request('https://api.brewerydb.com/v2/search/geo/point?lat='+'35.772096'+'&lng='+'-78.638614'+'&key='+process.env.BEER_KEY+'&format=json');
});

module.exports = router;