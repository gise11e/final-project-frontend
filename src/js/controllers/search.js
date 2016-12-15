angular.module('finalProject')
  .controller('SearchController', SearchController);

SearchController.$inject = ['Skill', '$state'];
function SearchController(Skill, $state) {
  const search = this;

  search.skills = Skill.query();

  function filterUsers() {
    const params = {};

    if(search.querySkills) {
      const skill_ids = search.querySkills.map((skill) => {
        return skill.id;
      });

      params.skill_ids = skill_ids;
    }

    if(search.location) {
      params.latitude = search.lat;
      params.longitude = search.lng;
    }

    $state.go('usersIndex', params);
  }

  search.filterUsers = filterUsers;
}
