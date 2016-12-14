angular.module('finalProject', ['ngResource', 'ui.router', 'stripe', 'satellizer', 'ui.select', 'ngSanitize', 'uiSwitch','ngHamburger'])
  .constant('API_URL', 'http://localhost:3000/api')
  .config(Auth)
  .config(
    function() {
      Stripe.setPublishableKey('pk_test_2DNYpLVI6IGvyQ26xOMwISkq');
    }
  );

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.loginUrl = `${API_URL}/login`;
  $authProvider.signupUrl = `${API_URL}/register`;

  $authProvider.tokenPrefix = '';
  $authProvider.facebook({
    clientId: '283342332068635'
  });
}
