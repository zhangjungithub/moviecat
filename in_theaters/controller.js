(function(angular){
    'use strict';
    /*1、创建正在热映的模块*/
    var module = angular.module('myApp.in_theaters',['ngRoute','myApp.services.http']);

    /*2、配置模块的路由,模块自己管理自己，只要引用我的模块就可以使用路由*/
    module.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/in_theaters/:page',{
            templateUrl: 'in_theaters/view.html',
            controller: 'InTheatersController'
        });
    }]);


    /*3、设置页面的控制器，对页面逻辑操作
    * 操作分为两步走：一是设计暴露数据二是设计暴露行为*/
    module.controller('InTheatersController', ['$scope','$route','$routeParams','HttpService',
            function($scope,$route,$routeParams,HttpService){
        /*处理分页
        https://api.douban.com/v2/movie/in_theaters?start=0&count=3&callback=my_json_cb_0015410700270274136*/
            var count = 3;//一页显示多少条
            //console.log($routeParams);
            var page = parseInt($routeParams.page);//获取是第几页
            var start = (page-1)*count;//从第几条开始显示
            $scope.currentPage = page;//当前页

            /*jsonp请求数据*/
            $scope.subjects = [];//获取的电影信息数组
            $scope.message = '';
            $scope.title = '';//模块标题
            $scope.totalNum = 0;//总条数
            $scope.totalpages = 0;//总页数

        var doubanApiAddress = 'https://api.douban.com/v2/movie/in_theaters';
        HttpService.jsonp(doubanApiAddress, {start:start,count:count}, function(res){

            if(res){
                $scope.subjects = res.subjects;
                $scope.title = res.title;
                $scope.totalNum = res.total;
                $scope.totalpages = Math.ceil($scope.totalNum/count);

                //调用自己写的服务返回的数据要通知angular对数据进行监视并同步
                //$scope.$apply('subjects');
                $scope.$apply();//也可以不指定值，只要它调用一下就自动同步所有数据到angualr
            }else{
                $scope.message = '哎呀，获取数据失败了2!'+err.statusText;
            }
        });


                /* 处理页面的切换的行为*/
                $scope.goPage = function(pageNum){
                    if(pageNum>=1 && pageNum<=$scope.totalpages){
                        /*路由中的这个函数用来更新url地址的参数*/
                        $route.updateParams({page:pageNum});
                    }else{
                        return;
                    }
                }

    }]);


/*
    module.controller('InTheatersController',['$scope','$http', function($scope,$http){

        $scope.subjects = [];
        $scope.message = '';
        /!*
        //使用$http服务进行异步请求(同域名下ajax)
        $http.get('./data.json').then(function(res){
            console.log(res);
            if(res.status === 200){
                $scope.subjects = res.data.subjects;
            }else{
                $scope.message = '哎呀，获取数据失败了!'+res.statusText;
            }
        },function(err){
            $scope.message = '哎呀，获取数据失败了2!'+err.statusText;
        })*!/

    /!*
        这样使用jsonp的方式可以支持多数api，但是douban不支持无法使用
        var doubanApiAddress = 'https://api.douban.com/v2/movie/in_theaters';
        /!*在angualr中使用jsonp服务必须在的当前地址后面加
         * 一个参数callback(此名不固定)='JSON_CALLBACK',angular会将此替换为一个随机函数名 * *!/
        $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res){
            console.log(res);
            if(res.status === 200){
                $scope.subjects = res.data.subjects;
            }else{
                $scope.message = '哎呀，获取数据失败了!'+res.statusText;
            }
        },function(err){
            $scope.message = '哎呀，获取数据失败了2!'+err.statusText;
        })*!/
        var doubanApiAddress = 'https://api.douban.com/v2/movie/in_theaters';

        jsonp(doubanApiAddress, {}, function(res){
            console.log(res);
        });

    }]);*/

})(angular)