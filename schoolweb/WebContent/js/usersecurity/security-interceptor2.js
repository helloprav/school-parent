function securityInterceptor($window, $state) {
	return {
		request : function(config) {
			return config;
		},
		requestError : function(config) {
			return config;
		},
		response : function(res) {
			return res;
		},
		responseError : function(res, $window) {
			console.log(JSON.stringify(res));
			console.log(":::::::error Response: " + res.status);
			if (res.status == 401) {
				alert("Authentication Failed...Please login to access the application.");
				//document.location.href = "/index.html";
				$state.go('login');
			}
			if (res.status == 403) {
				alert("Access Denied...You don't have permission to access.");
				//document.location.href = "/index.html";
				$state.go('login');
			}
			return res;
		}
	}
}

var routerApp = angular.module('routerApp');

routerApp.factory('securityInterceptor', securityInterceptor).config(
		function($httpProvider) {
			$httpProvider.interceptors.push('securityInterceptor');
		})
