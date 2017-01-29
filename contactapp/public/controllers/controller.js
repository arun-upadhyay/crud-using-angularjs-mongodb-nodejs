var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
 

	
var refresh = function() {

	$http.get('/contact-list').success(function(response) {
	$scope.contactList = response;
	$scope.contact = "";
	});
	};

	refresh();
    // add contact
	$scope.addContact = function() {
	$http.post('/save-contact', $scope.contact).success(function(response) {

	refresh();
	});
	}; 
	// remove contact 
	$scope.remove = function(id) {
	$http.delete('/delete-contact/' + id).success(function(response) {
		refresh();
	});
	};
	// edit contact 
	$scope.edit = function(id) {
	$http.get('/edit-contact/' + id).success(function(response) {
	$scope.contact = response;
	});
	};
	//save updated contact
	$scope.update = function() {
	$http.put('/update-save/' + $scope.contact._id, $scope.contact).success(function(response) {
		refresh();
	})
	};

	// on clear button click
	$scope.deselect = function() {
	  $scope.contact = "";
	}

}]);