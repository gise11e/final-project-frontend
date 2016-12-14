angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$auth', '$state','$http'];
function MainController($rootScope, $auth, $state, $http) {
  const main = this;
  main.isLoggedIn = $auth.isAuthenticated;
  //  main.message = null;
  main.menuVisible = false;

  function toggleMenu() {
    main.menuVisible = !main.menuVisible;
  }

  function logout() {
    $auth.logout()
     .then(() => {
       localStorage.removeItem('userId');
       $state.go('splash');
     });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState, toParams) {

    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('login');
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);
  main.logout = logout;
  main.toggleMenu = toggleMenu;
}



//
// MainController.$inject = ['$auth', '$state', '$rootScope', '$http'];
// function MainController($auth, $state, $rootScope, $http) {
//   const main = this;
//   main.isLoggedIn = $auth.isAuthenticated;
//   main.message = null;
//   main.menuVisible = false;
//
//   function toggleMenu() {
//     main.menuVisible = !main.menuVisible;
//   }
//
//   function logout() {
//     $auth.logout()
//     .then(() => {
//       localStorage.removeItem('userId');
//       $state.go('splash');
//     });
//   }
//
//   const protectedStates = ['profile','groupProfile','profileEdit','groupEdit'];
//
//   function secureState(e, toState) {
//     main.menuVisible = false;
//     main.message = null;
//     if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
//       e.preventDefault();
//       $state.go('login');
//       main.message = 'You must be logged in to go there!';
//     }
//
//   }
//
//   $rootScope.$on('$stateChangeStart', secureState);
//
//   main.logout = logout;
//   main.toggleMenu = toggleMenu;
//
//
// }
