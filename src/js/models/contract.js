angular.module('finalProject')
  .factory('Contract', Contract);

Contract.$inject = ['$resource', 'API_URL'];
function Contract($resource, API_URL) {
  return new $resource(`${API_URL}/contracts/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
