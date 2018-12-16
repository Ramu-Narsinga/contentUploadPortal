var userCredentialsModel = require("../models/userCredentials")
var fs = require('fs');
var path = require('path');
var session = require('express-session');

//save user signing up
exports.user_signup = function(req, res) {
  console.log("what's in signup req.body", req.body);
  // if (req.body.email.length > 0 &&
  //   req.body.username.length > 0 &&
  //   req.body.password.length > 0 &&
  //   req.body.passwordConf.length > 0) {

  // console.log("in if condition");
  userCredentialsModel.find()
    .sort([
      ['name', 'ascending']
    ])
    .exec(
      function(err, result) {
        if (err) {
          console.log("err in find of users list", err);
        } else {
          var userExists = false;
          console.log("users list", result);
          //iterate through list result and check if user exists and respond saying user exists already
          for (var i = 0; i < result.length; i++) {
            if (result[i].email == req.body.email) {
              console.log("user account already exists, please use different mail");
              userExists = true;
              res.json({
                result: "user exists",
                message: "User already exists, please use different mail."
              });
              break;
            }
          }

          if (!userExists) {
            // bc user doesn't exist save the user details
            var userData = new userCredentialsModel({
              email: req.body.email,
              username: req.body.name,
              password: req.body.password,
              passwordConf: req.body.passwordConf,
            });
            //save user credentials into mongodb
            userData.save(req.body, function(err, result) {
              if (err) {
                console.log("error while saving in mongodb", err);
                return error;
              } else {
                console.log("user credentials are succesfully saved");
                res.json({
                  result: "success",
                  message: 'You have successfully signed up, please login.'
                  // role: "generic"
                })
              }
            });
          }
        }
      });
}

exports.user_login = function(req, res) {
  var adminMail = "admin@ycm.in";
  var adminPwd = "Navneet@94";
  var loggedInState = false;

  console.log("in login usercredentials controller, req.body check", req.body);
  userCredentialsModel.findOne({
    email: req.body.email
  }, function(err, loginres) {
    if (err) {
      console.log("err" + err);
    } else {
      console.log("loginres", loginres);
      console.log("what's in admin mail and pwd before if", adminMail, adminPwd);
      if (req.body.email == adminMail && req.body.password == adminPwd) {
        console.log("what's in admin mail and pwd", adminMail, adminPwd);
        req.session.user = req.body.email;
        req.session.role = 'admin';
        res.json({
          result: 'success',
          role: 'admin',
          message: 'You have successfully logged in as admin'
        });
        loggedInState = true;
      } else {
        if (loginres != null) {
          if (req.body.email.length == 0 || req.body.password.length == 0) {
            res.json({
              Msg: "Please provide valid login details"
            })
          } else {
            req.session.user = req.body.email;
            req.session.role = 'generic'
            res.json({
              loginres,
              result: 'success',
              role: 'generic',
              message: 'You have successfully logged in'
            });
            loggedInState = true;
          }
        }
        console.log("what's in loggedInState before notifying", loggedInState)
        if (!loggedInState) {
          res.json({
            result: "Error",
            message: "Please provide valid Username and Password"
          });
        }
      }
    }
  });
}
