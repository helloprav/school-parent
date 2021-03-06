(function() {
    'use strict';

    angular.module('routerApp').controller(
	    'UsersController',
	    function($rootScope, $scope, $state, $http, $window, $location,
		    configFactory) {

		console.log("within UsersController.................");
		$scope.entityList = configFactory.entityList.data;
		$scope.configs = configFactory.configs;
		$scope.user = configFactory.user;
		$scope.alerts = configFactory.alerts;
		$scope.userRoles = configFactory.userRoles;
		$scope.userGenders = configFactory.userGenders;
		$scope.displayedCollection = [].concat($scope.configs);
		console.log("Alerts size = "+$scope.alerts.length);

		// var url = "/user-security-web/api/users/roles/student";
		// findEntity($http, $scope, url);

		$scope.createUser = function() {
			configFactory.create($scope.user);
		};
	    })
})();

function findEntity($http, $scope, url) {
    console.log("Within findEntity Utils");
    $http({
	url : url,
	method : "GET"
    }).success(function(responseBody, status, headers, config) {
	if (responseBody.statusCode == 200) {

	    console.log("response :::::::::::::" + responseBody.data);
	    if (responseBody.data != null) {
		$scope.entityList = responseBody.data;
		$scope.entityCount = responseBody.data.length;
	    }
	    console.log("entityCount :::::::::" + $scope.entityCount);

	    if ($scope.entityCount == 0) {
		$scope.error = "No Records Found";
	    }
	} else {
	    // alert(responseBody.data);
	}

    }).error(function(responseBody, status, headers, config) {
	console.log(responseBody);
	alert("Failed : " + responseBody);
	$scope.status = status;
    });
}
