"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix="",e.facebook({clientId:"283342332068635"})}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("usersDashboard")})}var o=this;o.credentials={},o.submit=r}function Contract(e,t){return new e(t+"/contracts/:id",{id:"@id"},{update:{method:"PUT"}})}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"="},link:function(t,r){t.base64=null,t.active=!1,e.onload=function(){t.base64=e.result,t.$apply()},r.on("dragover",function(){t.active=!0,t.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){t.active=!1,t.$apply()}).on("drop",function(t){t.preventDefault();var r=(t.target.files||t.dataTransfer.files)[0];e.readAsDataURL(r)})}}}function googleplace(e){return{restrict:"A",require:"ngModel",scope:{location:"=",lat:"=",lng:"="},link:function(t,r,o,l){var n={types:[],componentRestrictions:{}},a=new e.google.maps.places.Autocomplete(r[0],n);a.addListener("place_changed",function(){var e=a.getPlace(),o=e.geometry.location.toJSON();t.lat=o.lat,t.lng=o.lng,l.$setViewValue(r.val())})}}}function MainController(e,t,r,o){function l(){s.menuVisible=!s.menuVisible}function n(){t.logout().then(function(){localStorage.removeItem("userId"),r.go("splash")})}function a(e,o,l){t.isAuthenticated()&&(s.currentUserId=t.getPayload().id),(!t.isAuthenticated()&&i.includes(o.name)||"usersEdit"===o.name&&parseFloat(l.id)!==t.getPayload().id)&&(e.preventDefault(),r.go("login"))}var s=this;s.isLoggedIn=t.isAuthenticated,s.menuVisible=!1;var i=["usersEdit"];e.$on("$stateChangeStart",a),s.logout=n,s.toggleMenu=l}function Mubee(e,t){return new e(t+"/mubees/:id",{id:"@id"},{update:{method:"PUT"}})}function MubeesCreateController(e,t,r){function o(){e.save(l.mubee,function(){t.go("usersDashboard")})}var l=this;l.mubee={crew_id:t.params.crewId},l.contracts=r.query(),l.create=o}function MubeesShowController(e,t,r,o){function l(){console.log("clicked"),s.mubee.accepted=!0,s.mubee.$update(function(){r.go("usersDashboard")})}function n(){return o.getPayload().id===Number(r.params.id)}function a(){var e=o.getPayload().id;s.review.sender=e,s.review.recipient=s.mubee[s.mubee.review_recipient_role].id,s.review.mubee_id=s.mubee.id,console.log(s.review),t.save(s.review,function(){})}var s=this;s.isCurrentMubee=n,s.acceptRequest=l,s.mubee=e.get(r.params),s.createReview=a}function MubeesEditController(e,t){function r(){o.mubee.$update(function(){t.go("mubeesShow",t.params)})}var o=this;o.mubee=e.get(t.params),this.update=r}function Review(e,t){return new e(t+"/reviews/:id",{id:"@id"},{update:{method:"PUT"}})}function Router(e,t){e.state("splash",{url:"/",templateUrl:"/templates/splash.html",controller:"LoginController as login"}).state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("usersDashboard",{url:"/dashboard",templateUrl:"/templates/dashboard.html",controller:"UsersDashboardController as usersDashboard"}).state("payments",{url:"/dashboard",templateUrl:"/templates/stripe.html",controller:"PaymentsController as payments"}).state("mubeesCreate",{url:"/mubees?crewId",templateUrl:"/templates/mubeesCreate.html",controller:"MubeesCreateController as mubeesCreate"}).state("mubeesShow",{url:"/mubees/:id",templateUrl:"/templates/mubeesShow.html",controller:"MubeesShowController as mubeesShow"}).state("mubeesEdit",{url:"/mubees/:id/edit",templateUrl:"/templates/mubeesEdit.html",controller:"MubeesEditController as mubeesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),t.otherwise("/")}function Skill(e,t){return new e(t+"/skills/:id",{id:"@id"},{update:{method:"PUT"}})}function RatingController(){this.rating1=5,this.rating2=2,this.isReadonly=!0,this.rateFunction=function(e){console.log("Rating selected: "+e)}}function starRating(){return{restrict:"EA",template:'<ul class="star-rating" ng-class="{readonly: readonly}">  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">    <i class="fa fa-star"></i>  </li></ul>',scope:{ratingValue:"=ngModel",max:"=?",onRatingSelect:"&?",readonly:"=?"},link:function(e,t,r){function o(){e.stars=[];for(var t=0;t<e.max;t++)e.stars.push({filled:t<e.ratingValue})}void 0===e.max&&(e.max=5),e.toggle=function(t){void 0!==e.readonly&&e.readonly!==!1||(e.ratingValue=t+1,e.onRatingSelect({rating:t+1}))},e.$watch("ratingValue",function(e,t){t&&o()})}}}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e,t){function r(){if(o.querySkills){var t=o.querySkills.map(function(e){return e.id});o.params["skill_ids[]"]=t}o.all=e.query(o.params),o.showForm=!1}var o=this;o.skills=t.query(),o.showForm=!0,o.params={},o.filterUsers=r}function UsersShowController(e,t,r,o){function l(){return r.getPayload().id===Number(t.params.id)}function n(){a.review.producer_id=a.currentUserId,a.review.crew_id=t.params.id,o.save(a.review,function(){a.user=e.get(t.params)})}var a=this;a.review={},r.isAuthenticated()&&(a.currentUserId=r.getPayload().id),a.createReview=n,a.isCurrentUser=l,a.user=e.get(t.params)}function UsersEditController(e,t,r,o){function l(){return r.getPayload().id===Number(t.params.id)}function n(){var e=s.querySkills.map(function(e){return e.id});s.user.skill_ids=e}function a(){s.user.$update(function(){t.go("usersShow",t.params)})}var s=this;s.skills=o.query(),s.isCurrentUser=l,s.user=e.get(t.params),s.addSkills=n,this.update=a}function UsersDashboardController(e,t,r,o){var l=this,n=r.getPayload().id;l.user=e.get({id:n})}angular.module("finalProject",["ngResource","ui.router","stripe","satellizer","ui.select","ngSanitize","uiSwitch","ngHamburger"]).constant("API_URL","http://localhost:3000/api").config(Auth).config(function(){Stripe.setPublishableKey("pk_test_2DNYpLVI6IGvyQ26xOMwISkq")}),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Contract",Contract),Contract.$inject=["$resource","API_URL"],angular.module("finalProject").directive("dragDrop",dragDrop),angular.module("finalProject").directive("googleplace",googleplace),googleplace.$inject=["$window"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$rootScope","$auth","$state","$http"],angular.module("finalProject").factory("Mubee",Mubee),Mubee.$inject=["$resource","API_URL"],angular.module("finalProject").controller("MubeesEditController",MubeesEditController).controller("MubeesShowController",MubeesShowController).controller("MubeesCreateController",MubeesCreateController),MubeesCreateController.$inject=["Mubee","$state","Contract"],MubeesShowController.$inject=["Mubee","Review","$state","$auth"],MubeesEditController.$inject=["Mubee","$state"],angular.module("finalProject").factory("Review",Review),Review.$inject=["$resource","API_URL"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("Skill",Skill),Skill.$inject=["$resource","API_URL"],angular.module("finalProject").directive("starRating",starRating).controller("RatingController",RatingController),starRating.$inject=["$window"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController).controller("UsersDashboardController",UsersDashboardController),UsersIndexController.$inject=["User","Skill"],UsersShowController.$inject=["User","$state","$auth","Review"],UsersEditController.$inject=["User","$state","$auth","Skill"],UsersDashboardController.$inject=["User","$state","$auth","$http"];
//# sourceMappingURL=app.js.map