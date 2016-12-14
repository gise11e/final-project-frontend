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

  function isCurrentMubee() {
    return $auth.getPayload().id === Number($state.params.id);
  }

  mubeesShow.isCurrentMubee = isCurrentMubee;
  mubeesShow.acceptRequest = acceptRequest;

  mubeesShow.mubee = Mubee.get($state.params);

  function createReview() {
    const currentUserId = $auth.getPayload().id;

    mubeesShow.review.sender = currentUserId;
    mubeesShow.review.recipient = mubeesShow.mubee[mubeesShow.mubee.review_recipient_role].id;
    mubeesShow.review.mubee_id = mubeesShow.mubee.id;

    console.log(mubeesShow.review);
    Review.save(mubeesShow.review, () => {
      // $state.go('usersShow', {id: });
    });
  }

  mubeesShow.createReview = createReview;
}


MubeesEditController.$inject = ['Mubee', '$state'];
function MubeesEditController(Mubee, $state) {
  const mubeesEdit = this;

  mubeesEdit.mubee = Mubee.get($state.params);

  function update() {
    mubeesEdit.mubee.$update(() => {
      $state.go('mubeesShow', $state.params);

    });
  }
  this.update = update;
}
