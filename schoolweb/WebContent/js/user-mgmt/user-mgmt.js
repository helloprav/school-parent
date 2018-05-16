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
            abstract: true,
            controller: 'UsersController'
        })

        // nested list with custom controller
        .state('user-mgmt.list', {
            url: '/list',
            templateUrl: 'templates/user-mgmt/users-list.html',
            controller: 'UsersController',
            resolve: {
		configsPromise: ['configFactory', function(configFactory) {
			return configFactory.getAll();
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
