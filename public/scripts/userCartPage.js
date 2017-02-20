/**
 * http://usejsdoc.org/
 */
var app = angular.module('userCartApp', []);

app.controller('userCartCtrl', function($scope,$http, $window, $location) {
	
	$scope.suc = "display:none";

	$scope.user_name = $window.location.href.split("=")[1];
	console.log('ye' + $scope.user_name);
	
	$scope.userName ={
			un:$scope.user_name
	};
//	console.log("dddd"+$scope.user_name);
	
	/** Display item POST **/
	$http({
		method : "POST",
		url : '/endcart',
		data : $scope.userName,
	}).success(function(data_userCart) {
//        console.log('Data posted successfully');
        $scope.usercartitemDescription = data_userCart;
//        console.log("User's cart data MM : " + $scope.usercartitemDescription);
	}).error(function(error) {
		console.log("Error");
	});	
	
	
	$scope.removeItem = function(id){
//		$window.alert("djn");	
		console.log("ssd");
		console.log("gh" + id + "jd");
		$scope.itemDetailer = {
			user_name:$scope.user_name,
			id:id,
		};
			
		$window.alert($scope.itemDetailer.id + $scope.itemDetailer.user_name);
		
		$http({
			method : "POST",
			url : '/removeItem',
			data : $scope.itemDetailer,
		}).success(function(data) {
	        $scope.deletemsg = data;
			$scope.suc = "display:block";
			$scope.usercartitemDescription = null;
		}).error(function(error) {
			console.log("Error in deleting item from the cart");
		});	
		
	};
	
	
});