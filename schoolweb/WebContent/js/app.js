var userMgmtCtx = "/user-security-web/api";

var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'partial-dashboard.html',
            controller: 'DashboardCtrl'
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        })
        .state('login', {
            url: "/login",
            templateUrl: "templates/usersecurity/login-form.html",
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .state('register', {
            url: "/register",
            templateUrl: "templates/usersecurity/register-form.html",
            controller: 'RegisterCtrl',
            controllerAs: 'register'
        })
        ;

});

routerApp.controller('DashboardCtrl', function($scope, $state) {
  if ($scope.userID === undefined) {
        $state.go('login');
    } else {
    	console.log($scope.userID);
    }
});

routerApp.controller('scotchController', function($scope, $state) {
    
    if ($scope.userID === undefined) {
      //  $state.go('login');
    }
        
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

routerApp.controller('NavCtrl', [
	'$scope',
	'$location',
	function($scope, $location) {
		$scope.isTopNavActive = function(viewLocation) {
			var active = ($location.path().indexOf(viewLocation) == 0);
			return active;
		};
		$scope.isActive = function(viewLocation) {
			var active = $location.path().match('^'+viewLocation+'$');
			return active;
		};
		
	}
])// end nav controller
