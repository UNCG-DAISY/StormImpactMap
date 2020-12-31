var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('../public/js/load-storms')
tmp = util.load_storms()
// console.log(storms)
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render('index', {storms: tmp})
  //   if (err) {
  //     console.log("there was an error");
  // } else {
  //   console.log("successful");
  // }});
});

module.exports = router;
