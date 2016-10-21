var express = require('express');
var router = express.Router();
var request = require('request');
// console.log('beer'); <---Was used to test pathing of the controller
//TEST CONTROLLER
// router.get('/', function(req, res) {
//   console.log('testing controller');
// });

router.get('/:beer/breweries', function(req, res) {
  console.log('testing finding breweries by beer');
  request('https://api.brewerydb.com/v2/beer/' + req.params.beer + '/breweries?key='
    + process.env.BEER_KEY + '&format=json', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('searching for breweries with ' + req.params.beer)
        console.log(typeof body);
        // console.log(body);
        res.send(JSON.parse(body));
      } else {
        console.log(response.statusCode);
      }
  });
});

router.get('/:beer', function(req, res) {
  console.log('testing beer search');
  request('http://api.brewerydb.com/v2/search?q='+ req.params.beer + '&type=beer&key=' + 
    process.env.BEER_KEY + '&format=json', function(error, response, body) {
      if(!error && response.statusCode == 200) {
        console.log('searching beer');
        console.log(typeof body);
        // console.log('API data below...');
        // console.log(body);
        res.json(JSON.parse(body));
      } else {
        console.log(response.statusCode);
      }
  });
});

router.get('/search/:latitude/:longitude', function(req, res) {
  console.log('testing search');
  console.log(req.params);
  console.log(process.env.BEER_KEY);
  request('https://api.brewerydb.com/v2/search/geo/point?lat='+ req.params.latitude +'&lng='+
    req.params.longitude +'&key='+process.env.BEER_KEY+'&format=json', function(error, response, body) {
      if (!error) {
        console.log('searching coordinates');
        // console.log(body);
        console.log(typeof body);
        // console.log(body);
        res.json(JSON.parse(body));
      } else {
        console.log(error);
      }
    });
});

module.exports = router;