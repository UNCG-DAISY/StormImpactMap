var express = require('express');
var router = express.Router();
var path = require('path');
// var viewer = require('../public/js/src/viewer.js')
// var load_images = require('../public/js/src/util.js')

// console.log(viewer);

router.get('/', function(req, res, next) {
  
    res.sendFile('viewer.html', {root: path.join(__dirname, '../views/')}, function (err) {
      if (err) {
        console.log("there was an error");
    } else {
      console.log("successful");
    }});
  });

module.exports = router;
