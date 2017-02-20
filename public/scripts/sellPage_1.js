/**
 * http://usejsdoc.org/
 */
var app1 = angular.module('sellPage_1_App', []);
		app1.controller('sellPage_1_Ctrl', function($scope, $http, $window, $location) {
			
			$scope.user_name = $window.location.href.split("=")[1];
			
			$scope.fixPrice = function(){
				$window.alert("Fixed Price");
				console.log("Varuuuuuuuuuuu");
				var i = 0;
				if($scope.categoryItem == null){
					$scope.g ="Please select a catgory";
					i =i+1;
				}
				else{
					$scope.g = null;

				}
				if(($scope.itemName == null) || ($scope.itemName == "" )){
					$scope.f ="Cannot be left blank";
					i =i+1;
				}
				else{
					$scope.f = null;
				}
				if(($scope.itemDesc == null) || ($scope.itemDesc == "" )){
					$scope.b ="Cannot be left blank";
					i =i+1;
				}
				else{
					$scope.b = null;
				}
				if(($scope.sellerInfo == null) || ($scope.sellerInfo == "" )){
					$scope.c ="Cannot be left blank";
					i =i+1;
				}
				else{
					$scope.c = null;
				}
				if(($scope.itemPrice == null) || ($scope.itemPrice == "" )){
					$scope.d ="Cannot be left blank";
					i =i+1;
				}			
				else{
					$scope.d = null;
				}
				if(($scope.itemQuantity == null) || ($scope.itemQuantity == "" )){
					$scope.e ="Cannot be left blank";
					i =i+1;
				}
				else{
					$scope.e = null;
				}
				$window.alert(i+"pathak");

					if(i===0){
						console.log(i+"pathak");
						$scope.item_detail_fix = {
								item_name :$scope.itemName,
								item_desc :$scope.itemDesc,
								seller_info :$scope.sellerInfo,
								item_price :$scope.itemPrice,
								item_quantity :$scope.itemQuantity,
								item_category:$scope.categoryItem
						} ;
						
						$http({
							method : "POST",
							url : '/fix_price',
							data : $scope.item_detail_fix ,
						}).success(function(data1) {
					        console.log('Data posted successfully');
							$scope.b = null;
							$scope.c = null;
							$scope.d = null;
							$scope.e = null;
							$scope.f = null;
							$scope.g = null;
						}).error(function(error1) {
							console.log("Error");
						});	
				
					}
			};
	});