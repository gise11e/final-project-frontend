angular.module('finalProject')
  .factory('Mubee', Mubee);

Mubee.$inject = ['$resource', 'API_URL'];
function Mubee($resource, API_URL) {
  return new $resource(`${API_URL}/mubees/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
