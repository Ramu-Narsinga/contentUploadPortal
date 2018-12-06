var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("in router index file")
   res.redirect('/');
});

module.exports = router;
