// Register the `genericUser` component on the `genericUser` module,

'use strict';

angular.
module('genericUser').
component('genericUser', {
  // Note: The URL is relative to our `index.html` file
  templateUrl: 'generic-user/generic-user.template.html',
  controller: ['$scope', function GenericUserController($scope) {
    //dropdown for districts
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
      
    //this function gets called when a file is uploaded
    $scope.fileSelected = function($flow, $event) {
      console.log("in fileSelected Function:", $flow, $event);
    }

    // to remove uploaded image from front end, and sending $flow object
    $scope.removeImg = function ($flow) {
      console.log("in remove IMG", $flow);
      $flow.cancel();
    }
  }
  ]
});
