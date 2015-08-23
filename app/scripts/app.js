'use strict'

var app = (function () {
  var app = angular.module('ms', [
    'ngRoute',
    'ngProgress',
    'homeControllers',
    'articleControllers'
  ]).run(function ($http) {
  })

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/index.html',
      controller: 'HomeIndexCtrl'
    })
    .when('/articles', {
      templateUrl: 'article/list.html',
      controller: 'ArticleListCtrl'
    })
    .when('/articles/:articleId', {
      templateUrl: 'article/editor.html',
      controller: 'ArticleEditorCtrl'
    })
  }])

  return app
})()
