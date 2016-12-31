
(function(angular){
  'use strict';

  /*创建一个主module，并且注入子模块*/

  var myApp = angular.module('myApp',
      ['ngRoute',
        'myApp.in_theaters',
        'myApp.coming_soon',
        'myApp.top250'
      ]);

  /*给主模块配置路由，如果路由地址找不到就跳转到主模块中*/
  myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({
      redirectTo:'/in_theaters/1'
    });
  }]);


  /*给主模块创建控制器*/
  myApp.controller('IndexController',['$scope',function($scope){

  }]);


})(angular)