
var app = angular.module('demo', [
                                  'ngResource',
                                  'ui.router'
                                  ]);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/",
			views: {
				'main': {
					templateUrl: 'login.html',
					controller: 'LoginController'
				}
			}
		})
		.state('addshow', {
			url: "/addshow",
			views: {
				'main': {
					templateUrl: 'addshow.html',
					controller: 'AddShowController'
				}
			}
		})
		.state('list', {
			url: "/list",
			views: {
				'main': {
					templateUrl: 'list.html',
					controller: 'MovieListController'
				}
			}
		})
		.state('book', {
			url: "/book/:showId",
			views: {
				'main': {
					templateUrl: 'booking.html',
					controller: 'BookingController'
				}
			}
		})
		.state('ticket', {
			url: "/ticket/:showId",
			views: {
				'main': {
					templateUrl: 'ticket.html',
					controller: 'TicketListController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
});

app.filter('range', function() {
	
	  return function(input, total) {
		  
	    total = parseInt(total);

	    for (var i=0; i<total; i++)
	      input.push(i);
	    
	    return input;
	  };
});

app.factory('UserFactory', function ($resource) {
	return $resource('/UserManagement/rest/users/:id/', {id: '@id'}, {
	});
});

app.factory('MovieFactory', function ($resource) {
	return $resource('/UserManagement/rest/movies/:id/', {id: '@id'}, {
	});
});

app.factory('BookingFactory', function ($resource) {
	return $resource('/UserManagement/rest/bookings/:id/', {id: '@id'}, {
	});
});

app.controller('LoginController', function ($scope, $state, UserService) {

    $scope.userList = UserService;
    
    $scope.onSignIn = function () {
    	if($scope.userList.authenticateUser($scope.loginUsername, $scope.loginPassword) == "guest")
    		$state.go("list");
    	else if($scope.userList.authenticateUser($scope.loginUsername, $scope.loginPassword) == "admin")
    		$state.go("addshow");
    	else
    		$scope.error = "Username or Password is Wrong!";
    };
});

app.controller('AddShowController', function ($scope, MovieService) {

	$scope.movieList = MovieService;
	$state.go("list");
            
});

app.controller('MovieListController', function ($scope, MovieService) {

	$scope.movieList = MovieService;
});

app.controller('BookingController', function ($scope, $state, $stateParams, MovieService, BookingService) {

	$scope.movieList = MovieService;
	$scope.movieList.selectedShow = $scope.movieList.getShow($stateParams.showId);
	$scope.seat = { };

	$scope.book = function () {
		$scope.booking = BookingService;
		$scope.movieList.selectedShow.seats = $scope.booking.getSelectedSeats($scope.seat);
		$scope.booking.createBooking($scope.movieList.selectedShow)
		$state.go("ticket", { showId:$stateParams.showId });
	};	
});

app.controller('TicketListController', function ($scope, $window, $stateParams, MovieService, BookingService) {
	$scope.movieList = MovieService;
	
	$scope.movieList.selectedShow = $scope.movieList.getShow($stateParams.showId);
	$scope.booking = BookingService;
	
	$scope.print = function () {
		$window.print();
	};
});

app.controller('AddShowController', function ($scope, BookingService) {
	$scope.addshow = function() {
		$scope.booking = BookingService;
		$scope.booking.createBooking($scope.show)
	};
});

app.service('UserService', function (UserFactory) {

	var self = {

			'hasMore': true,
			'isLoading': false,

			'users': [],
	
			'authenticateUser': function (username, password) {
				var user="guest";						
				if ( username == "admin" && password == "admin" )
					user="admin";
				else if (username == "guest" && password == "guest")
					user="guest";
				
				return user;
				
			},
			
			'loadUsers': function() {
				
				if (self.hasMore && !self.isLoading) {
					self.isLoading = true;
					
				    UserFactory.query({}, function (userFactory) {
				    		self.users = userFactory;
				        
				    	if (!userFactory.next) {
				    		self.hasMore = false;
				    	}
				    	self.isLoading = false;			    	
			    	});
				}
			}

		};
	
	self.loadUsers();
	return self;
});

app.service('BookingService', function (BookingFactory, $rootScope) {
	
	var self = {
			
			'isSaving': false,
			
			'createBooking': function(booking) {
				self.isSaving = true;
				BookingFactory.save(booking).$promise.then( function () {
					self.isSaving = false;
				});
			},
			
			'selectedSeats': [],
			
			'getSelectedSeats': function(seats) {
				
				for (var i = 0; i <= Object.keys(seats).length; i++) {
					
					if (seats[i]) {
						self.selectedSeats.push(i);
					}					
				}
				
				return self.selectedSeats;
			}
	}
	
	return self;
	
});

app.service('MovieService', function (UserFactory, MovieFactory, $rootScope) {
	
	var self = {
			
			'hasMore': true,
			'isLoading': false,
				
			'getShow': function (showId) {
				
				for (var i = 0; i < self.movies.length; i++) {
					var obj = self.movies[i];
					if (obj.showId == showId) {
						return obj;
					}
				}
			},

			'movies': [],
			
			'loadMovies': function() {
				
				if (self.hasMore && !self.isLoading) {
					self.isLoading = true;
					
				    MovieFactory.query({}, function (movieFactory) {
				    		self.movies = movieFactory;
				        
				    	if (!movieFactory.next) {
				    		self.hasMore = false;
				    	}
				    	
				    	self.isLoading = false;
			    	
			    	});
				}
			}
	};

	self.loadMovies();
	return self;
});

