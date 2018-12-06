var express = require('express');
var router = express.Router();

console.log("router is initialized");
/* POST users listing. */
router.post('/uploadUserContent', function(req, res, next) {
  console.log("in routes");
  res.json(200, {'test': 'it works!'})
});

router.get('/pop', function (req, res) {
  var data = {
    "Fruits": [
      "apple",
      "orange"    ]
  };
  res.send(data);
});


module.exports = router;
