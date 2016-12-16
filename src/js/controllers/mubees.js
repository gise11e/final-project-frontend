angular.module('finalProject')
  .controller('MubeesEditController', MubeesEditController)
  .controller('MubeesShowController', MubeesShowController)
  .controller('MubeesCreateController', MubeesCreateController);

MubeesCreateController.$inject = ['Mubee', '$state', 'Contract'];
function MubeesCreateController(Mubee, $state, Contract) {
  const mubeesCreate = this;

  mubeesCreate.mubee = {
    crew_id: $state.params.crewId
  };

  mubeesCreate.contracts = Contract.query();

  function createMubee() {
    Mubee.save(mubeesCreate.mubee, () => {
      $state.go('usersDashboard');
    });
  }

  mubeesCreate.create = createMubee;
}


MubeesShowController.$inject = ['Mubee', 'Review', '$state', '$auth'];
function MubeesShowController(Mubee, Review, $state, $auth) {
  const mubeesShow = this;

  function acceptRequest() {
    console.log('clicked');
    mubeesShow.mubee.accepted = true;
    mubeesShow.mubee.$update(() => {
      $state.go('usersDashboard');
    });
  }
  mubeesShow.currentUserId = $auth.getPayload().id;

  mubeesShow.mubee = Mubee.get($state.params);

  mubeesShow.mubee.$promise.then(function(mubee) {
    mubeesShow.isOwnProfile = (mubeesShow.currentUserId ===  mubee.crew.id);
  });

  function isCurrentMubee() {
    return $auth.getPayload().id === Number($state.params.id);
  }

  mubeesShow.isCurrentMubee = isCurrentMubee;
  // mubeesShow.isOwnProfile = isOwnProfile;

  mubeesShow.acceptRequest = acceptRequest;

  function createReview() {
    const currentUserId = $auth.getPayload().id;

    mubeesShow.review.sender = currentUserId;
    mubeesShow.review.recipient = mubeesShow.mubee[mubeesShow.mubee.review_recipient_role].id;
    mubeesShow.review.mubee_id = mubeesShow.mubee.id;

    console.log(mubeesShow.review);
    Review.save(mubeesShow.review, () => {
      $state.go('usersShow', {id: mubeesShow.review.recipient });
    });
  }

  mubeesShow.createReview = createReview;
}

MubeesEditController.$inject = ['Mubee', '$state', 'Contract'];
function MubeesEditController(Mubee, $state, Contract) {
  const mubeesEdit = this;

  mubeesEdit.mubee = Mubee.get($state.params);
  mubeesEdit.contracts = Contract.query();

  function update() {
    mubeesEdit.mubee.$update(() => {
      $state.go('mubeesShow', { id: mubeesEdit.mubee.id });
    });
  }
  function deleteMubee() {
    mubeesEdit.mubee.$remove(() => {
      $state.go('usersDashboard');
    });
  }
  this.delete = deleteMubee;
  this.update = update;
}
