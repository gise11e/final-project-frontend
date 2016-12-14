angular.module('finalProject')
.controller('PaymentsController', function($scope, $http) {
  $scope.saveCustomer = function(status, response) {
    console.log(status);
    console.log(response);
    // $http.post('/save_customer', { token: response.id });
  };
});
