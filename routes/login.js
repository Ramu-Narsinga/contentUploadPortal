var express = require('express');
var router = express.Router();

//require controller function from user credentials controller
var userSignup = require('../controllers/userCredentialsController.js');

/* GET home page. */
router.post('/signup', userSignup.user_signup);

// post request for login
router.post('/login', userSignup.user_login);

module.exports = router;
