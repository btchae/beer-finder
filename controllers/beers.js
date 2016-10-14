var express = require('express');
var router = express.Router();
// console.log('beer'); <---Was used to test pathing of the controller
//TEST CONTROLLER
router.get('/', function(req, res) {
  console.log('testing controller');
});

module.exports = router;