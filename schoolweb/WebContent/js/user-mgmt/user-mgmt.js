/**
 * 
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('user-mgmt', {
            url: '/user-mgmt',
            templateUrl: 'templates/user-mgmt/index.html',
            controller: 'UsersController',
            resolve: {
		userRolePromise: ['configFactory', function(configFactory) {
			return configFactory.getUserRole();
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.list', {
            url: '/list/{role}',
            templateUrl: 'templates/user-mgmt/users-list.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', '$stateParams', function(configFactory, $stateParams) {
		    console.log('Hello: '+$stateParams.role);
			return configFactory.getUsersByRole($stateParams.role);
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.listBackup', {
            url: '/list/:role',
            templateUrl: 'templates/user-mgmt/users-list.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', '$stateParams', function(configFactory, $stateParams) {
		    console.log('Hello: '+$stateParams.role);
			return configFactory.getUsersByRole($stateParams.selectedItem);
		}]
            }
        })

        // nested list with custom controller
        .state('user-mgmt.new', {
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
