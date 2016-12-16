angular.module('finalProject')
  .factory('Payment', Payment);

Payment.$inject = ['$resource', 'API_URL'];
function Payment($resource, API_URL) {
  return new $resource(`${API_URL}/charges`);
}
