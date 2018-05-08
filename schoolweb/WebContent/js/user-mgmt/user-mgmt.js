/**
 * 
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('user-mgmt', {
            url: '/user-mgmt',
            templateUrl: 'templates/user-mgmt/index.html'
        })
        
        // nested list with custom controller
        .state('user-mgmt.list', {
            url: '/list',
            templateUrl: 'templates/user-mgmt/users-list.html',
            controller: 'UsersController'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        ;
        
});
