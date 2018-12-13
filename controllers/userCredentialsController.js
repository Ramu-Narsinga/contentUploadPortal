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

  console.log("in if condition");

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
        role: "generic"
      })
    }
  });
  // }
}

exports.user_login = function(req, res) {
  var adminMail = "admin@ycm.in";
  var adminPwd = "Navneet@94";

  console.log("in login usercredentials controller, req.body check", req.body);
  userCredentialsModel.findOne({
    email: req.body.email
  }, function(err, loginres) {
    if (err) {
      //console.log("err" + err);
    } else {
      //console.log("member details successfully saved" + JSON.stringify(moddata) + "reqbody" + JSON.stringify(req.body));
      //res.redirect("/memorabilia");
      var loggedInState = false;
      if (req.body.email == adminMail && req.body.password == adminPwd) {
        req.session.user = req.body.email;
        req.session.role = 'admin';
        res.json({
          result: 'success',
          role: 'admin',
          message: 'You have successfully logged in as admin'
        });
        loggedInState = true;
      } else {
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

      if (!loggedInState) {
        res.json({ result: "Error", message: "Please provide valid Username and Password" });
      }
    }
  });
}
