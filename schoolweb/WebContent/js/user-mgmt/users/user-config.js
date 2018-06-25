/**
 * 
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('user-mgmt', {
            url: '/user-mgmt',
            templateUrl: 'templates/user-mgmt/placeHolder.html',
            controller: 'UsersController',
            abstract: true,
        })
    
        .state('user-mgmt.users', {
            url: '/users',
            templateUrl: 'templates/user-mgmt/users/index.html',
            controller: 'UsersController',
            resolve: {
		userRolePromise: ['configFactory', function(configFactory) {
			return configFactory.getUserRole();
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.users.list', {
            url: '/list/{role}',
            templateUrl: 'templates/user-mgmt/users/users-list.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', '$stateParams', function(configFactory, $stateParams) {
		    console.log('Hello: '+$stateParams.role);
		    if($stateParams.role != null) {
			return configFactory.getUsersByRole($stateParams.role);
		    }
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.listBackup', {
            url: '/list/:role',
            templateUrl: 'templates/user-mgmt/users/users-list.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', '$stateParams', function(configFactory, $stateParams) {
		    console.log('Hello.listBackup: '+$stateParams.role);
			return configFactory.getUsersByRole($stateParams.selectedItem);
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.users.new', {
            url: '/new',
            templateUrl: 'templates/user-mgmt/users/new.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', function(configFactory) {
			return configFactory.resetAll();
		}],
		newPromise: ['configFactory', function(configFactory) {
			return configFactory.initNew();
		}]
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
});
