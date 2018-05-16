var myapp = angular.module('routerApp');

routerApp.service('UserService',['$http', '$scope', function($http, $scope) {
   return {
       getUserList: function() {
	   var url = "/user-security-web/api/users/roles/student";
	   findEntity($http, $scope, url);
       },
       doSomeThingElse: function() {

       }
   }
}]);

