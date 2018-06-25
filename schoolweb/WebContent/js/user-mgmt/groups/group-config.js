/**
 * 
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('group-mgmt', {
            url: '/group-mgmt',
            templateUrl: 'templates/user-mgmt/placeHolder.html',
            abstract: true,
        })

        .state('group-mgmt.groups', {
            url: '/groups',
            templateUrl: 'templates/user-mgmt/groups/index.html',
            abstract: false
        })

        // nested list with custom controller
        .state('group-mgmt.groups.list', {
            url: '/list/{role}',
            templateUrl: 'templates/user-mgmt/groups/groups-list.html',
            controller: 'GroupsController',
            resolve: {
		configsPromise: ['groupFactory', '$stateParams', function(groupFactory, $stateParams) {
		    console.log('Hello: ');
		    return groupFactory.getAll();
		}]
            }
        })

        // nested view item
        .state('group-mgmt.groups.view', {
            url: '/{groupId}/view',
            templateUrl: 'templates/user-mgmt/groups/group-view.html',
            controller: 'GroupsController',
            resolve: {
		configsPromise: ['groupFactory', '$stateParams', function(groupFactory, $stateParams) {
		    console.log('group-mgmt.groups.view:: groupFactory.get(groupId): '+$stateParams.groupId);
		    return groupFactory.get($stateParams.groupId);
		}]
            }
        })

        // nested view item
        .state('group-mgmt.groups.edit', {
            url: '/{groupId}/edit',
            templateUrl: 'templates/user-mgmt/groups/edit.html',
            controller: 'GroupsController',
            resolve: {
		configsPromise: ['groupFactory', '$stateParams', function(groupFactory, $stateParams) {
		    console.log('groupFactory.get($stateParams.groupId): '+$stateParams.groupId);
		    return groupFactory.get($stateParams.groupId);
		}],
		functionsPromise: ['functionFactory', '$stateParams', function(functionFactory, $stateParams) {
		    console.log('functionFactory.getAll()');
		    return functionFactory.getAll();
		}]
            }
        })

        // nested view item
        .state('group-mgmt.groups.new', {
            url: '/new',
            templateUrl: 'templates/user-mgmt/groups/new.html',
            controller: 'GroupsController',
            resolve: {
		functionsPromise: ['functionFactory', '$stateParams', function(functionFactory, $stateParams) {
		    console.log('group-mgmt.groups.new:: functionFactory.getAll()');
		    return functionFactory.getAll();
		}]
            }
        })

        // nested list with custom controller
        .state('group-mgmt.groups.new_old', {
            url: '/new',
            templateUrl: 'templates/user-mgmt/groups/new.html',
            controller: 'GroupsController',
            resolve: {
		configsPromise: ['groupFactory', function(groupFactory) {
			return groupFactory.resetAll();
		}],
		newPromise: ['groupFactory', function(groupFactory) {
			return groupFactory.initNew();
		}]
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
});
