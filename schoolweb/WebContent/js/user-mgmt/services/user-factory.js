var userMgmtCtx = "/user-security-web/api";
angular.module('routerApp')
.factory('configFactory', [
	'$http', 
	'$state',
	function($http, $state) {
		var o = {
			configs: [],
			entityList: [],
			user: {},
			alerts: [],
			userRoles: [],
			userGenders: []
		};

		o.resetAll = function() {
			console.log("reset All called");
			o.configs = [];
			o.user = {};
			o.alerts = [];
			o.userRoles = [];
			o.userGenders = [];
		}

		o.initNew = function() {
			console.log("initNew called");
			initRoles();
			initGenders();
		}

		o.getUserRole = function() {
			console.log("getUserRole called");
			initRoles();
		}

		function initRoles() {
			console.log("initRoles called");
			o.userRoles = [];
		    	var url = userMgmtCtx+"/validvalues/userroles";
			return $http.get(url).then(function(res) {
				angular.copy(res.data, o.userRoles);
				console.log("initRoles called: "+o.userRoles);
			})
		}

		function initGenders() {
			console.log("initGenders called");
			o.userGenders = [];
		    	var url = userMgmtCtx+"/validvalues/genders";
			return $http.get(url).then(function(res) {
				angular.copy(res.data, o.userGenders);
				console.log("initGenders called: "+o.userGenders);
			})
		}

		o.get = function(id) {
			console.log("get called for id:"+id);
		    	var url = userMgmtCtx+"/users/roles/student";
			return $http.get(url).then(function(res) {
				angular.copy(res.data, o.user);
			})
		};

		o.getAll = function() {
			console.log('getting all users');
		    	var url = userMgmtCtx+"/users";
			return $http.get(url).success(function(data) {
				o.configs = [];
				angular.copy(data, o.configs);
				angular.copy(data, o.entityList);
			});
		};

		o.getUsersByRole = function(role) {
			console.log('getting all users for role: '+role);
		    	var url = userMgmtCtx+"/users";
		    	if(role != 'All') {
		    	    url = url+"/roles/"+role;
		    	}
			return $http.get(url).success(function(data) {
				o.configs = [];
				angular.copy(data, o.configs);
				angular.copy(data, o.entityList);
				console.log('getting all users for data: '+o.entityList.data);
			});
		};

		o.create = function(user) {
			console.log("Creating User ");
			user.version = new Date().getTime();		
			if(user.skipFirstLine == undefined) {
				user.skipFirstLine = false;
			}
			if(user.active == undefined) {
				user.active = false;
			}
			
			return $http.post(userMgmtCtx+'/users', user)
			.success(function(data) {
				o.setAlert("success", "Successfully created user!");

				$state.go('user-mgmt.list');				
			})
			.error(function(data, status, headers, user) {
				console.log("Error creating! status = "+status+", data = "+data);
				o.setAlert("danger", "Error creating user!");
			});
		}
		
		o.update = function(config) {
			console.log("Updating config");
			return $http.put('/config/'+config._id, config)
			.success(function(data) {
				o.setAlert("success", "Successfully updated config!");
				
				$state.go('config.list');				
			})
			.error(function(data, status) {
				console.log("Error updating! status = "+status+", data = "+data);
				o.setAlert("danger", "Error updating config!");
			});
		}
		
		o.delete = function(id) {
			var confirmed = window.confirm("Are you sure you want to delete?");
			console.log("Deleting config "+id+" confirmed = "+confirmed);
			
			if(confirmed) {
				$http.delete('/config/'+id).success(function(data) {
					console.log("deleted");
					o.setAlert("success", "Successfully deleted config!");

				})
				.error(function(data, status) {
					console.log("Error deleting! status = "+status+", data = "+data);
					o.setAlert("danger", "Error deleting config!");

				});
			}
			$state.go('user-mgmt.list');
			$state.reload();
		}
		
		o.setAlert = function(type, msg) {
			console.log("Setting alert type %s, msg %s", type, msg);
			//reset the alert
			o.alerts=[];
			o.alerts.push({type: type, msg: msg});
		}
		return o;
	}
]) //end config factory
.controller('ConfigCtrl', [
	'$scope',
	'configFactory',
	function($scope, configFactory) {
		$scope.configs = configFactory.configs;
		$scope.user = configFactory.user;
		$scope.alerts = configFactory.alerts;
		$scope.displayedCollection = [].concat($scope.configs);
		console.log("Alerts size = "+$scope.alerts.length);

		if($scope.user != undefined) {
			$scope.editmode = true;
		}
		
		$scope.addUser = function() {
			configFactory.create($scope.user);
		};
		
		$scope.updateUser = function() {
			configFactory.update($scope.user);			
		}
		
		$scope.deleteConfig = function(id) {
			configFactory.delete(id);
		}
		
		$scope.changeType = function() {
			console.log("Type changed to "+$scope.config.type);
			if($scope.config.commands == undefined) {
				$scope.config.commands = [{}];				
			}
		}
		
		$scope.closeAlert = function(index) {
		    $scope.alerts.splice(index, 1);
		};

		$scope.addAnotherCommand = function() {
			console.log("Add another Commnad clicked");
			$scope.config.commands.push({});
		};
		
		$scope.deleteCommand = function(index) {
			console.log("Delete command clicked index = "+index);
			if($scope.config.commands.length > 1) {
				$scope.config.commands.splice(index, 1);				
			}

		};
		
		
	}
])// end config controller
; 