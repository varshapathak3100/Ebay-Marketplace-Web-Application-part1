/**
 * http://usejsdoc.org/
 */
var app = angular.module('addtocartApp', []);

app.controller('addtocartCtrl', function($scope,$http, $window, $location) {
	$scope.suc = "display:none";

	$scope.attr1 = $window.location.href.split("=")[1];
	console.log($scope.attr1);

	$scope.attr2 = $window.location.href.split("&")[1];
	$scope.user_name = $scope.attr2.split("=")[1];
	
	$scope.item={
			id:$scope.attr1.split("&")[0],
			name:$scope.user_name
	};
	console.log($scope.item.id);
	/** Display item POST **/
	$http({
		method : "POST",
		url : '/addtocart',
		data : $scope.item,
	}).success(function(data2) {
//        console.log('Data posted successfully');
        $scope.cartitemDescription = data2;
        console.log("Varshaaaaaaaaaaaaaaaaaaaaaa" + $scope.cartitemDescription );
	}).error(function(error) {
		console.log("ghjError");
	});	

	var quant = 0;
	/** Get quantity POST **/
//	$http({
//		method : "POST",
//		url : '/addtocart_quant',
//		data : $scope.item,
//	}).success(function(data3) {
////        console.log('Data posted successfully');
//        $scope.quant = data3;
//        console.log("Varshaaaaaaaaaaaaaaaaaaaaaa MMMMM" +
//        		"" + data3);
//	}).error(function(error) {
//		console.log("qqqError");
//	});	

	/** Checking quantity for 'Buy it now' **/
	$scope.buyit = function(){
		if(($scope.quantEntered == null) || ($scope.quantEntered == "" ) || ($scope.quantEntered == 0 ) || (Number($scope.quantEntered) > Number($scope.quant))){
			$scope.errMsg ="Enter valid quantity";
		}
		else{	
			$window.location.href ="/buyitnowPage.html?itemId="+$scope.item.id+"&username="+$scope.user_name;
		}
	};
	
	
	
	
//	console.log("Item id which user wants to add to cart = " + $scope.item.id);
//	$window.alert( "wohoooooooooooo");
//		$window.location.href = '/addtocartPage.html';
//	};

	
	/** Add to cart Final Check quantity**/
	$scope.addtocartFinal = function(){
//		$scope.quant =0;

		/** Checking quantity entered by user **/		
		if(($scope.quantEntered == null) || ($scope.quantEntered == "" ) || ($scope.quantEntered == 0 ) ||  (Number($scope.quantEntered) > Number($scope.quant))){
			$scope.errMsg ="Enter valid quantity";
//			$window.alert("Varsha" +  $scope.quant);
			$scope.suc = "display:none";
		}
		else{
			$scope.errMsg = null;
//			$window.alert("Meghaa" + $scope.quant);
			$scope.suc = "display:block";
			
			
			$scope.nameANDitem = {
				name:$scope.user_name,
				item:$scope.item.id,
				quant:$scope.quantEntered,
			};
			
			$http({
				method : "POST",
				url : '/addingtousercart',
				data : $scope.nameANDitem
			}).success(function(data2) {
		        console.log('Data posted successfully in the user cart database');
//		        console.log("Varsha" + data2);
			}).error(function(error) {
				console.log("adtError");
			});	
		}
	};
});
