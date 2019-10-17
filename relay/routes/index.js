const path = require('path');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



module.exports = router;
