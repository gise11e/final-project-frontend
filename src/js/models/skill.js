angular.module('finalProject')
  .factory('Skill', Skill);

Skill.$inject = ['$resource', 'API_URL'];
function Skill($resource, API_URL) {
  return new $resource(`${API_URL}/skills/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
