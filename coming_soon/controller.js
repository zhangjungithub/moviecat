(function(angular){
    'use strict';
    /*1、创建马上上影的模块*/
    var module = angular.module('myApp.coming_soon',['ngRoute']);

    /*2、配置模块的路由,模块自己管理自己，只要引用我的模块就可以使用路由*/
    module.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/coming_soon',{
            templateUrl: 'coming_soon/view.html',
            controller: 'ComingSoonController'
        });
    }]);


    /*3、设置页面的控制器，对页面逻辑操作*/
    module.controller('ComingSoonController',['$scope',function($scope){

    }]);



})(angular)