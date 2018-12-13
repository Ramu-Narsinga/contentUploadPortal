"use strict";

function userCredentialsService($http, $q) {

  //post request to save user signed up details
  this.userCredentialsPostRequest = function(userCredentialDetails) {
    console.log("in userCredentialDetails service", userCredentialDetails);

    var req = {
      method: 'POST',
      url: '/signup',
      data: userCredentialDetails
    }

    return ($http(req).then(successCallback, errorCallback));
  }

  //get request for logging in
  this.userloginPostRequest = function(loginDetails) {
    console.log("loginDetails", loginDetails);
    var req = {
      method: 'POST',
      url: '/login',
      data: loginDetails
    }

    return ($http(req).then(successCallback, errorCallback));
  }

  //API response payload
  function successCallback(response) {
    console.log("success", response);
    return response;
  }

  function errorCallback(response) {
    return ($q.reject("error", response));
  }
}

//register service on ng root
angular.module('myApp').service('userCredentialsService', userCredentialsService);
