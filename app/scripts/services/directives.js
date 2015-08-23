'use strict'

var app = angular.module('ms')

app.directive('blogPagination', function () {
  function getItems(current, total) {
    var min = Math.max(1, current - 4),
      max = Math.min(total + 1, current + 5),
      range = []
    for (var i = min; i < max; i++) {
      range.push(i)
    }
    return range
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
        $scope.items = getItems($scope.current, $scope.total)
        $scope.isFirst = $scope.current === 1
        $scope.isLast = $scope.current === $scope.total
        $scope.hasMorePrev = $scope.items[0] > 1
        $scope.hasMoreNext = $scope.items[$scope.items.length - 1] < $scope.total
      }

      $scope.to = function (page) {
        $scope.current = page
      }
      $scope.$watch('total', flush)
      $scope.$watch('current', flush)
    }
  }
})

app.directive('blogLabel', function () {
  return {
    restrict: 'A',
    templateUrl: 'common/label.html?_=' + Date.now(),
    scope: {
      labels: '='
    },
    controller: function LabelCtrl($scope, $element, $attrs, $transclude) {
      $scope.create = function (event) {
        if (event.keyCode !== 13) return
        if (!$scope.temp) return
        if (!$scope.labels) {
          $scope.labels = []
        }
        if ($scope.labels.indexOf($scope.temp) < 0)
          $scope.labels.push($scope.temp)
        $scope.temp = ''
      }
      $scope.remove = function (index) {
        $scope.labels.splice(index, 1)
      }
    }
  }
})

app.directive('blogNowTag', function () {
  return {
    restrict: 'A',
    templateUrl: 'common/now_label.html?_=' + Date.now(),
    scope: {
      labels: '='
    },
    controller: function NowLabelCtrl($scope, $element, $attrs, $transclude, Tag) {
      Tag.all(function (result) {
        var tags = []
        result.forEach(function (tag) {
          tags.push(tag.name)
        })
        $scope.tags = tags
      })
      $scope.addToTag = function (index) {
        if (!$scope.labels) {
          $scope.labels = []
        }
        if ($scope.labels.indexOf($scope.tags[index]) < 0)
          $scope.labels.push($scope.tags[index])
        $scope.tags.splice(index, 1)
      }
    }
  }
})
