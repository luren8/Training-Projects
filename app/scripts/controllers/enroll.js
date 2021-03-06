'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('trainingProjectsApp')
	.controller('enrollCtrl', ['$scope', '$http', '$location', '$state', function($scope, $http, $location, $state) {

		//   从其它页面跳转  	
		if(!sessionStorage.username) {
			$state.go('login');
		}

		//    验证用户名
		var userName = /[\u4e00-\u9fa5]/;
		$scope.enuserShow = false;
		$scope.chang = function() {
			if($scope.enusername == '') {
				$scope.enuserShow = true;
			} else if(!(userName.test($scope.enusername) == true)) {
				$scope.enuserShow = true;
			} else if($scope.enusername == $scope.myNewName) {
				$scope.enuserShow = false;
			} else {
				$scope.enuserShow = false;
			}
		}

		$scope.enfocusUser = function() {
			$scope.enuserShow = false;
		}

		//     真实姓名  
		$scope.nameSow = false;
		$scope.NewName = function() {
			if($scope.myNewName == '') {
				$scope.nameSow = true;
			} else if(!(userName.test($scope.myNewName))) {
				$scope.nameSow = true;
			} else if($scope.enusername != $scope.myNewName) {
				$scope.nameSow = true;
			} else {
				$scope.nameSow = false;
			}
		}

		$scope.enfocusTurnAme = function() {
			$scope.nameSow = false;
		}

		//   验证密码
		var pasExp = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,}$/;
		$scope.paShow = false;
		$scope.paschang = function() {
			if($scope.enpasswold == '') {
				$scope.paShow = true;
			} else if(!(pasExp.test($scope.enpasswold) == true)) {
				$scope.paShow = true;
			} else if($scope.enpasswold < 6) {
				$scope.paShow = true;
			} else if($scope.enpasswold > 12) {
				$scope.paShow = true;
			} else {
				$scope.paShow = false;
			}
		}

		$scope.enfocusPass = function() {
			$scope.paShow = false;
		}

		//   邮箱
		var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
		$scope.emailShow = false;
		$scope.enmail = function() {
			if($scope.enemail == '') {
				$scope.emailShow = true;
			} else if(!(regEmail.test($scope.enemail) == true)) {
				$scope.emailShow = true;
			} else {
				$scope.emailShow = false;
			}
		}
		$scope.enfocusEmail = function() {
			$scope.emailShow = false;
		}

		//   手机号  	
		var regExp = /^1[3'/4578]\d{9}$/;
		$scope.enPhone = false;
		$scope.zhj_phone = function() {
			if($scope.regExp == '') {
				$scope.enPhone = true;
			} else if(!(regExp.test($scope.ennphone) == true)) {
				$scope.enPhone = true;
			} else {
				$scope.enPhone = false;
			}
		}
		$scope.enfocusPhone = function() {
			$scope.enPhone = false;
		}

		//   qq验证  	
		var regqq = /^\d{5,10}$/;
		$scope.enq = false;
		$scope.enqq = function() {
			if($scope.QQ == '') {
				$scope.enq = true;
			} else if(!(regqq.test($scope.QQ) == true)) {
				$scope.enq = true;
			} else {
				$scope.enq = false;
			}
		}
		$scope.enfocusQQ = function() {
			$scope.enq = false;
		}
		
		
		//   详细地址
		
		

		//   验证其他手机号  	
		var othExp = /^1[3'/4578]\d{9}$/;
		$scope.otherShow = false;
		$scope.othPhone = function() {
			if($scope.othExp == '') {
				$scope.otherShow = true;
			} else if(!(othExp.test($scope.otherphone) == true)) {
				$scope.otherShow = true;
			} else {
				$scope.otherShow = false;
			}
		}
		$scope.enfocusOthers = function() {
			$scope.otherShow = false;
		}

		// 点击注册的时候
		$scope.enusername = '';
		$scope.enpasswold = '';
		$scope.enposition = '';
		$scope.sex = '';
		$scope.enemail = '';
		$scope.ennphone = '';
		$scope.QQ = '';
		$scope.otherphone = '';
		$scope.myNewName = '';
		$scope.enAddr = '';

		$scope.enShodowshow = false;
		$scope.entrue = false;
		$scope.enregister = function(e) {
			if($scope.enusername == '' || $scope.enpasswold == '' || $scope.enposition == '' || $scope.sex == '' || $scope.enemail == '' || $scope.ennphone == '' || $scope.QQ == '' || $scope.otherphone == '' || $scope.myNewName == '' || $scope.enAddr == '') {
				$scope.enShodowshow = true;
				$scope.entext='信息未填写完整！'
			} else {
				$scope.entrue=true;
				$scope.zhj_Besure=function(){
				$scope.entrue = false;
				$http({
					url: "http://" + ip + "users",
					method: "post",
					data: {
						"username": $scope.enusername,
						"password": $scope.enpasswold,
						"level": $scope.enposition,
						"sex": $scope.sex,
						"email": $scope.enemail,
						"tel": $scope.ennphone,
						"qq": $scope.QQ,
						"others": $scope.otherphone,
						"address": $scope.enAddr,
						"name": $scope.myNewName,
						"pic": 'aW1hZ2VzL2ljb24ucG5n',
						"color": 'white'
					}
				}).then(function(e) {
//					console.log(e);
//					console.log(sessionStorage.myPic);
//					sessionStorage.myPic = 'images/icon.png';
								
										
					$scope.enusername = '';
					$scope.enpasswold = '';
					$scope.enposition = '';
					$scope.sex = '';
					$scope.enemail = '';
					$scope.ennphone = '';
					$scope.QQ = '';
					$scope.otherphone = '';
					$scope.myNewName = '';
					$scope.enAddr = '';
					$location.path('/firstPage/tel');
					
					
				}, function() {
					$scope.enShodowshow = true;
					$scope.entext='用户名已注册！'
				})
			}
		}							
 	  }

		$scope.zhj_comeBack = function() {
			$location.path('/firstPage/tel');
		}
		
		$scope.zhj_BesureII = function() {
    		$scope.entrue = false;
		}

		$scope.enrollHide = function() {
			$scope.enShodowshow = false;
		}

	}]);