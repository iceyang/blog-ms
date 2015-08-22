'use strict'

var app = (function () {
  var app = angular.module('ms', [
    'ngRoute',
    'ngProgress',
    'homeControllers',
    'clientControllers'
  ]).run(function ($http) {
  })

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/index.html',
      controller: 'HomeIndexCtrl'
    })
  }])

  return app
})()
