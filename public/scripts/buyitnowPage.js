/**
 * http://usejsdoc.org/
 */
var app = angular.module('addtocartApp', []);

app.controller('buyitnowCtrl', function($scope,$rootScope , $http, $window, $location) {

	$scope.suc = "display:none";
	
	$scope.quantity_total = 0;
	$scope.price_total = 0;

	
	$scope.attr2 = $window.location.href.split("&")[1];
	$scope.user_name = $scope.attr2.split("=")[1];
	
	$scope.attr1 = $window.location.href.split("=")[1];
	console.log($scope.attr1);
	$scope.item={
			id:$scope.attr1.split("&")[0],
			name:$scope.user_name
	};
	$window.alert($scope.item.id + $scope.item.name);

	
		$http({
			method : "POST",
			url : '/checkoutitems',
			data : $scope.item
		}).success(function(data3) {
	        $scope.cartitemDescription = data3;
//	        $scope.price_item_final = data3;
//	        $window.alert($scope.cartitemDescription);
		}).error(function(error) {
			console.log("Error");
		});
		
		$http({
			method : "POST",
			url : '/addtocart_quant',
			data : $scope.item,
		}).success(function(data3) {
	        $scope.quantity_total += Number(data3);
//	        $scope.price_item_final = data3;
		}).error(function(error) {
			console.log("Error");
		});
		
		$http({
			method : "POST",
			url : '/addtocart_price',
			data : $scope.item,
		}).success(function(datap) {
	        $scope.price_total += Number(datap);
//	        $scope.price_item_final = data3;
			$scope.total = Number($scope.quantity_total) * Number($scope.price_total);
		}).error(function(error) {
			console.log("Error");
		});
//		$window.alert($scope.quantity_total + "varsha" + $scope.price_total);
		
	$scope.checkcardDetails = function(){
		
		var i = 0;
		if(($scope.Credit_Card_Number == null) || ($scope.Credit_Card_Number == "" )){
			$scope.a ="Cannot be left blank";
			i =i+1;
		}
		else{
			$scope.a = null;
		}
		if(($scope.expiry_month == null) || ($scope.expiry_month == "" )){
			$scope.b ="Invalid";
			i =i+1;
		}
		else{
			$scope.b = null;
		}
		if(($scope.expiry_year == null) || ($scope.expiry_year == "" )){
			$scope.c ="Invalid";
			i =i+1;
		}
		else{
			$scope.c = null;
		}
		if(($scope.cvvnumber == null) || ($scope.cvvnumber == "" )){
			$scope.d ="Cannot be left blank";
			i =i+1;
		}
		else{
			$scope.d = null;
		}
		if(($scope.firstName == null) || ($scope.firstName == "" )){
			$scope.e ="Cannot be left blank";
			i =i+1;
		}			
		else{
			$scope.e = null;
		}
		if(($scope.secondName == null) || ($scope.secondName == "" )){
			$scope.f ="Cannot be left blank";
			i =i+1;
		}
		else{
			$scope.f = null;
		}
		
		
		if(i==0){
			
		$scope.item ={
				Credit_Card_Number:$scope.Credit_Card_Number,
				expiry_month:$scope.expiry_month,
				expiry_year:$scope.expiry_year,
				cvvnumber:$scope.cvvnumber
		};
		
			$http({
				method : "POST",
				url : '/creditcardCheck',
				data : $scope.item,
			}).success(function(data4) {
//		        $scope.cartitemDescription = data4 ;
		        if(Number(data4)== 1){
		        	$scope.errorMsg = "Congratulations !! Your order is placed successfully!";
					$scope.suc = "display:block";
		        	$scope.Credit_Card_Number = null;
		        	$scope.expiry_month = null;
		        	$scope.expiry_year = null;
		        	$scope.cvvnumber = null;
					$scope.firstName = null;
					$scope.secondName = null;
		        }
		        else{
		        	$scope.errorMsg = "Invalid card details";
		        	$scope.Credit_Card_Number = null;
		        	$scope.expiry_month = null;
		        	$scope.expiry_year = null;
		        	$scope.cvvnumber = null;
					$scope.firstName = null;
					$scope.secondName = null;
		        }
			}).error(function(error) {
				console.log("Error");
			});
		}
	};
});