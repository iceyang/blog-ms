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

  app.directive('blogPagination', function () {
    function getItems(current, total) {
      var min = Math.max(1, current - 4),
        max = Math.min(total + 1, current + 5),
        range = [];
      for (var i = min; i < max; i++) {
        range.push(i);
      }
      return range;
    }

    return {
      restrict: 'A',
      templateUrl: 'common/pager.html?_=' + Date.now(),
      scope: {
        current: '=',
        total: '='
      },
      controller: function PagerCtrl($scope, $element, $attrs, $transclude) {
        function flush() {
          $scope.items = getItems($scope.current, $scope.total);
          $scope.isFirst = $scope.current === 1;
          $scope.isLast = $scope.current === $scope.total;
          $scope.hasMorePrev = $scope.items[0] > 1;
          $scope.hasMoreNext = $scope.items[$scope.items.length - 1] < $scope.total;
        }

        $scope.to = function (page) {
          $scope.current = page;
        }
        $scope.$watch('total', flush);
        $scope.$watch('current', flush);
      }
    }
  });

  return app
})()
