'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('trainingProjectsApp')
  .controller('resourceCtrl', ["$scope","$http","$filter","$location","$state",function ($scope,$http,$filter,$location,$state) {
  	
  	
  	//直接打url地址跳转登录页面
  	if(!sessionStorage.username){
		$state.go('login')
	}
  	
  	
  	//请求领导层的
  	$http({
  		url:"http://"+ip+"users/?level=1",
  		method:'get'
  		
  	}).then(function(e){
		$scope.zhydata = e.data;
//		console.log($scope.zhydata)
	})
  	//请求BOSS的
	$http({
		url:"http://"+ip+"users/?level=0",
		method:'get'
		
	}).then(function(e){
		$scope.zhydata1 = e.data;
//		console.log($scope.zhydata1)
	})
	
	$scope.zhyop = true;
	if(sessionStorage.level==1){
		$scope.zhyop = !$scope.zhyop;
	}
  	
  	
  	
  	//设置每个input的值
  	$scope.shenqingren = sessionStorage.username;
	$scope.shoujianren = '';
	$scope.wuzi = '';
	$scope.yongtu = '';
	$scope.ZhyisShow = false;
	$scope.ZhyisHide = true;
	$scope.zhy_show = false;
	$scope.zhy_ss = false;
	
	$scope.now = new Date();
	$scope.dt2 = $filter("date")($scope.now, "yyyy/MM/dd HH:mm:ss");
//	console.log($scope.dt2);
//	console.log($scope.now);
	$scope.bg1 = true;
	$scope.bg2 = false;
	
	//判断如果是boss进入直接弹框
	if(sessionStorage.level==0){
		$scope.zhy_ss = !$scope.zhy_ss;
	}
	//点击×跳转首页
	$scope.zhy_pa = function(){
		$location.url('/firstPage');
	}
	
	
	
	//点击办公用品
	$scope.toggle=function(){
		$scope.ZhyisHide = true;
		$scope.bg1 = true;
		$scope.bg2 = false;
	}
	//点击福利
	$scope.toggle1=function(){
		
		if(sessionStorage.level==2){
//			console.log(sessionStorage.level)
			$scope.ZhyisHide = true;
			$scope.bg1 = true;
			$scope.bg2 = false;
			$scope.zhy_show = true;
		}else{
			$scope.zhy_show = false;
			$scope.ZhyisHide = false;
			$scope.bg1 = false;
			$scope.bg2 = true;
		}
		
		
	}
	
	
	
	//点击蒙版中的确定按钮
	$scope.zhy_dis = function(){
		$scope.ZhyisShow = !$scope.ZhyisShow
	}
	$scope.zhy_display = function(){
		$scope.zhy_show = !$scope.zhy_show
	}
	
//	$scope.zhy_xiaoshi = false;
	
	//点击办公用品的提交按钮
	$scope.zhy_btn1 = function(){
//		console.log($scope.shenqingren)
//		console.log($scope.shoujianren)
//		console.log($scope.wuzi)
//		console.log($scope.yongtu)
		$scope.zhy_xiaoshi = false;
		$('.zhy_tishi').animate({bottom:'1rem',opacity:1},0);
		
		//判断是否为空
		if($scope.shenqingren==''||$scope.shoujianren==''||$scope.wuzi==''||$scope.yongtu==''){
			$scope.ZhyisShow = !$scope.ZhyisShow;
		}else{
			$http({
				url:"http://"+ip+"shoujianxiang",
				method:'post',
				data:{
						fusername:$scope.shenqingren,
						title:"办公用品申请",
						content:$scope.wuzi+$scope.yongtu,
						date:$scope.dt2,
						uid:$scope.shoujianren,
						read:'false'
					}
			}).then(function(e){
//				console.log(e)
				
				$scope.shenqingren = sessionStorage.username;
				$scope.shoujianren = '';
				$scope.wuzi = '';
				$scope.yongtu = '';
				$scope.zhy_xiaoshi = !$scope.zhy_xiaoshi;
				$('.zhy_tishi').animate({bottom:'2.5rem',opacity:'0'},2000);
				
			})
			
			
		}
		
	}
	
	
	
	//点击福利的提交按钮
	$scope.zhy_btn2 = function(){
//		console.log($scope.shenqingren)
//		console.log($scope.shoujianren)
//		console.log($scope.wuzi)
//		console.log($scope.yongtu)
		
		//
		$scope.zhy_xiaoshi = false;
		$('.zhy_tishi').animate({bottom:'1rem',opacity:1},0);
		
		//判断是否为空
		
		if($scope.shenqingren==''||$scope.shoujianren==''||$scope.wuzi==''||$scope.yongtu==''){
			$scope.ZhyisShow = !$scope.ZhyisShow;
		}else{
			$http({
				url:"http://"+ip+"shoujianxiang",
				method:'post',
				data:{
						fusername:$scope.shenqingren,
						title:"福利申请",
						content:$scope.wuzi+$scope.yongtu,
						date:$scope.dt2,
						uid:$scope.shoujianren,
						read:'false'
					}
			}).then(function(e){
//				console.log(e)
				$scope.shenqingren = sessionStorage.username;
				$scope.shoujianren = '';
				$scope.wuzi = '';
				$scope.yongtu = '';
				$scope.zhy_xiaoshi = !$scope.zhy_xiaoshi;
				$('.zhy_tishi').animate({bottom:'2.5rem',opacity:'0'},2000);
				
			})
			
			
		}
	}
	
	
  	
 }]);