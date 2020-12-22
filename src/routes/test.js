var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  
    res.sendFile('test.html', {root: path.join(__dirname, '../views/')}, function (err) {
      if (err) {
        console.log("there was an error");
    } else {
      console.log("successful");
    }});
  });

module.exports = router;
