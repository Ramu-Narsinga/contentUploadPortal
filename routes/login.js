var express = require('express');
var router = express.Router();

//require controller function from user credentials controller
var userSignup = require('../controllers/userCredentialsController.js');

/* GET home page. */
router.post('/signup', userSignup.user_signup);

// post request for login
router.post('/login', userSignup.user_login);

// GET route after registering
router.get('/profile', function (req, res, next) {
	console.log("what's in req profile", req.session);
	res.send("some response sent");
});


module.exports = router;
