angular.module('finalProject')
.controller('PaymentsController', PaymentsController);


PaymentsController.$inject = ['Payment', '$state', '$http', '$scope'];

function PaymentsController(Payment, $state, $http, $scope) {
  $scope.saveCustomer = function (status, response) {
    $http.post('http://localhost:3000/api/charges', { stripeToken: response.id });
  };

  const paymentsShow = this;

  paymentsShow.stripeCustomer = Payment.get({});
}
