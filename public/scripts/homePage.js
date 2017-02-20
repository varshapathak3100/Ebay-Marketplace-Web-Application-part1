/**
 * http://usejsdoc.org/
 */
var app = angular.module('homePageApp', []);

app.controller('homePageCtrl', function($scope, $http, $window, $location) {
//		$window.location.href = '/signinPage.html';
	$scope.category = null;
//	$window.alert("Welcome to eBay");
	$scope.itemDescription = null;
	
	$scope.user_name =$window.location.href.split("=")[1];
	
	$scope.cartItem = {
			  id  : null,
			};
	/** HTTP call to get items from selected categories from database **/	
	$http({
		method : "POST",
		url : '/get_items',
		data : $scope.category ,
	}).success(function(data1) {
		$scope.itemDescription = data1;
//		$window.alert(data1.item_name);
//        console.log('Data posted successfully');
	}).error(function(error1) {
		console.log("Error");
	});	
	
	$scope.addToCart = function(cart_item){
//		var cartItem = cart_item;
		$scope.cartItem.id = cart_item;
		$window.alert($scope.cartItem.id);
		$window.location.href = "/addtocartPage.html";
	};
	
	
	
});
	