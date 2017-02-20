/**
 * http://usejsdoc.org/
 */
var app1 = angular.module('profilePageApp', []);
		app1.controller('profilePageCtrl', function($scope, $http, $window, $location) {
			$scope.user_name = $window.location.href.split("=")[1];
//			$window.alert($scope.user_name);
			
			

			$scope.user_detail_holder={
					name:null,
					fn:null,
					ln:null,
					bd:null,
					pn:null,
					ha:null
			};
			
			
			
			/** Display message **/
			$scope.fix_details = "display:block";
			$scope.edit_details = "display:none";
			$scope.suc = "display:none";

			$scope.userName={
					name:$scope.user_name
			};
			
			/** User details POST **/
			$http({
				method : "POST",
				url : '/usernameDetails',
				data : $scope.userName 
			}).success(function(data1) {
		        $scope.userDetails = data1;
		        console.log($scope.userDetails);
			}).error(function(error1) {
				console.log("Error");
			});	
			
			/** Edit Profile **/
			$scope.edit_profile = function(){
				$window.alert("clicked");
				$scope.fix_details = "display:none";
				$scope.edit_details = "display:block";
		
	
			/** Save Profile **/
			$scope.save_profile = function(){
				
				
				
				$scope.user_detail_holder={
						name:$scope.user_name,
						fn:$scope.fn,
						ln:$scope.ln,
						bd:$scope.bd,
						pn:$scope.cn,
						ha:$scope.locat
				};
				
				console.log($scope.user_name+$scope.fn+$scope.ln+$scope.bd+$scope.cn+$scope.locat);
				
			
			/** Update user details User details POST **/
			$http({
				method : "POST",
				url : '/updateUserDetails',
				data : $scope.user_detail_holder 
			}).success(function(datam) {
//		        $scope.UpdateuserDetails = data1;
		        console.log("Updated Successfully");
		        $scope.fix_details = "display:block";
				$scope.edit_details = "display:none";
				$scope.suc = "display:block";
				$http({
					method : "POST",
					url : '/usernameDetails',
					data : $scope.userName 
				}).success(function(data1) {
			        $scope.userDetails = data1;
			        console.log($scope.userDetails);
				}).error(function(error1) {
					console.log("Error");
				});	
				
			}).error(function(error) {
				console.log("Error");
			});	
			
			};
			};
			
});