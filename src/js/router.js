angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      templateUrl: '/templates/splash.html',
      controller: 'LoginController as login'
    })
    .state('search', {
      url: '/search',
      templateUrl: '/templates/search.html',
      controller: 'SearchController as search'
    })
    .state('usersIndex', {
      url: '/users?skill_ids&latitude&longitude',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('usersDashboard', {
      url: '/dashboard',
      templateUrl: '/templates/dashboard.html',
      controller: 'UsersDashboardController as usersDashboard'
    })
    .state('payments', {
      url: '/dashboard',
      templateUrl: '/templates/stripe.html',
      controller: 'PaymentsController as payments'
    })
    // .state('Search', {
    //   url: '/search',
    //   templateUrl: '/templates/search.html',
    //   controller: 'UsersSearchController as Search'
    // })
    .state('mubeesCreate', {
      url: '/mubees?crewId',
      templateUrl: '/templates/mubeesCreate.html',
      controller: 'MubeesCreateController as mubeesCreate'
    })
    .state('mubeesShow', {
      url: '/mubees/:id',
      templateUrl: '/templates/mubeesShow.html',
      controller: 'MubeesShowController as mubeesShow'
    })
    .state('mubeesEdit', {
      url: '/mubees/:id/edit',
      templateUrl: '/templates/mubeesEdit.html',
      controller: 'MubeesEditController as mubeesEdit'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });

  $urlRouterProvider.otherwise('/');
}
