(function () {
    'use strict';

    angular.module('routerApp').controller('UsersController', function ($rootScope, $scope, $state, $http, $window, $location) {

		console.log("within UsersController.................");
		var url = "/user-security-web/api/users/roles/student";
		findEntity($http, $scope, url);

        $scope.loginUser = function () {

            if ($scope.login.username == ''
                || $scope.login.password == '') {

            	$scope.error = "Please enter username and password";
                return;
            }

            var loginJson = {};
            loginJson['email'] = $scope.login.username;
            loginJson['password'] = $scope.login.password;

            console.log(JSON.stringify(loginJson));
            $scope.loginDetail = loginJson;
            $scope.response=[];
            $http(
                {
                    url : "/user-security-web/api/auth/login",
                    method : "POST",
                    data : $scope.loginDetail
                })
                .success(
                    function(data, status, headers,
                             config) {

//                        console.log("status: "+status);
//                        console.log("headers: "+headers);
//                        console.log("config: "+config);
                        console.log("data: "+data);

                        $scope.responseBody = data.data;
                        console.log(JSON.stringify($scope.responseBody));

                        var statusCode = data.statusCode;
                        if (statusCode == 200) {

                            $scope.userID = $scope.responseBody.userID;

                            $window.localStorage.setItem("saved", $scope.responseBody);
                            $window.localStorage.setItem("loginuserid", $scope.userID);

                            if($window.localStorage.userName!=""||$window.localStorage.password!="")
                            {
                                $window.localStorage.userName = "";
                                $window.localStorage.password = "";
                                console.log("reset password");
                                $window.localStorage.password = $scope.password;
                                $window.localStorage.userName = $scope.userName;
                                console.log("password reset completed");
                            }
                            $state.go('home');

                            //var currentloc = $location.absUrl();
                            //$window.location.href = "./index.html";
                        } else{

                        	$scope.error = "This will never be displayed";
                        }
                    })
                .error(
                    function(data, status, headers,
                             config) {
                        console.log("data: "+data);
                        console.log("data.statusCode: "+data.statusCode);
                        console.log("status: "+status);
                        console.log("headers: "+headers);
                        console.log("config: "+config);

                        console.log("Within failure error ::::::::::::"+data.responseBody);
                        $scope.error = "Invalid Credentials";
                    });
        };
        $scope.test = function () {
            var test = true;
        };
    })
})();


function findEntity($http, $scope, url) {
	console.log("Within findEntity Utils");
	$http({
		url : url,
		method : "GET"
	}).success(
			function(responseBody, status, headers, config) {
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
					//alert(responseBody.data);
				}

			}).error(function(responseBody, status, headers, config) {
		console.log(responseBody);
		alert("Failed : " + responseBody);
		$scope.status = status;
	});
}
