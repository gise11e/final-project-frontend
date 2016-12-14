angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController)
  .controller('UsersDashboardController', UsersDashboardController);


UsersIndexController.$inject = ['User','Skill'];
function UsersIndexController(User, Skill) {
  const usersIndex = this;

  usersIndex.skills = Skill.query();

  usersIndex.showForm = true;
  usersIndex.params = {};
  function filterUsers() {
    if(usersIndex.querySkills) {
      const skill_ids = usersIndex.querySkills.map((skill) => {
        return skill.id;
      });

      usersIndex.params['skill_ids[]'] = skill_ids;
    }

    usersIndex.all = User.query(usersIndex.params);
    usersIndex.showForm = false;
  }

  usersIndex.filterUsers = filterUsers;

}

UsersShowController.$inject = ['User', '$state', '$auth','Review'];
function UsersShowController(User, $state, $auth, Review) {
  const usersShow = this;
  usersShow.review = {};

  if($auth.isAuthenticated()) {
    usersShow.currentUserId = $auth.getPayload().id;
  }

  function isCurrentUser() {
    return $auth.getPayload().id === Number($state.params.id);
  }

  function createReview() {
    usersShow.review.producer_id = usersShow.currentUserId;
    usersShow.review.crew_id = $state.params.id;
    Review.save(usersShow.review, () => {
      usersShow.user = User.get($state.params);
    });
  }

  usersShow.createReview = createReview;

  usersShow.isCurrentUser = isCurrentUser;

  usersShow.user = User.get($state.params);
}

UsersEditController.$inject = ['User', '$state', '$auth', 'Skill'];
function UsersEditController(User, $state, $auth, Skill) {
  const usersEdit = this;

  usersEdit.skills = Skill.query();

  function isCurrentUser() {
    return $auth.getPayload().id === Number($state.params.id);
  }

  usersEdit.isCurrentUser = isCurrentUser;

  usersEdit.user = User.get($state.params);

  function addSkills() {
    const skill_ids = usersEdit.querySkills.map((skill) => {
      return skill.id;
    });
    usersEdit.user.skill_ids = skill_ids;
  }

  usersEdit.addSkills = addSkills;


  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }
  this.update = update;
}


UsersDashboardController.$inject = ['User', '$state', '$auth', '$http'];
function UsersDashboardController(User, $state, $auth, $http) {
  const usersDashboard = this;
  const currentUserId = $auth.getPayload().id;

  usersDashboard.user = User.get({id: currentUserId});


  // const token = `Bearer ${$auth.getToken()}`;
  //
  // const req = {
  //   method: 'GET',
  //   url: 'http://localhost:3000/api/dashboard',
  //   headers: { authorizaton: token }
  // };
  // $http(req).then((response) => {
  //   usersDashboard.user = response.data.user;
  //   usersDashboard.mubees = response.data.mubees;
  // });

}
