var express = require('express');
var router = express.Router();
var request = require('request');
// console.log('beer'); <---Was used to test pathing of the controller
//TEST CONTROLLER
router.get('/', function(req, res) {
  console.log('testing controller');
});

router.get('/:beer', function(req, res) {
  console.log('testing beer search');
  request('http://api.brewerydb.com/v2/search?q='+ req.params.beer + '&type=beer&key=' + 
    process.env.BEER_KEY + '&format=json', function(error, response, body) {
      if(!error && response.statusCode == 200) {
        console.log('API data below...');
        console.log(body);
      }
  });
});

router.get('/search/:longitude/:latitude', function(req, res) {
  console.log('testing search');
  request('https://api.brewerydb.com/v2/search/geo/point?lat='+'35.772096'+'&lng='+
    '-78.638614'+'&key='+process.env.BEER_KEY+'&format=json');
});

module.exports = router;