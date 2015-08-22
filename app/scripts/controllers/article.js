'use strict'

angular.module('articleControllers', ['DataCenterServices', 'ngProgress'])
  .controller('ArticleListCtrl', ['$scope', 'Article', 'ngProgressFactory', function ($scope, Article, ngProgressFactory) {
    var progressBar = ngProgressFactory.createInstance()
    if (!$scope.condition) {
      $scope.condition = {
        current: 1,
        limit: 10
      }
    }
    var query = function () {
      progressBar.start()
      Article.query($scope.condition, function (results) {
        progressBar.complete()
        $scope.articles = results.list
        $scope.residue = results.residue
        $scope.total = parseInt(results.total / $scope.condition.limit + 1)
      })
    }
    $scope.query = query

    $scope.$watch('condition.current', query)

    $scope.query()
  }])
  .controller('ArticleEditorCtrl', ['$scope', '$routeParams', 'Article', 'ngProgressFactory', function ($scope, $routeParams, Article, ngProgressFactory) {
    var progressBar = ngProgressFactory.createInstance()
    var articleId = $routeParams.articleId
    progressBar.start() 
    if (articleId == "000000000000000000000000") {
      $scope.article = {}
      progressBar.complete() 
      return
    }
    Article.get({articleId: articleId}, function (result) {
      $scope.article = result
      progressBar.complete() 
    })
  }])
