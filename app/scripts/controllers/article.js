'use strict'

angular.module('articleControllers', ['DataCenterServices', 'ngProgress'])
  .controller('ArticleListCtrl', ['$scope', 'Article', 'Category', 'ngProgressFactory', function ($scope, Article, Category, ngProgressFactory) {
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
    
    async.series([
      function (done) {
        Category.all(function (categories) {
          $scope.categories = categories
          done()
        })
      },
      function (done) {
        $scope.$watch('condition.current', query)
        done()
      }
    ])
  }])

  .controller('ArticleEditorCtrl', ['$scope', '$routeParams', 'Article', 'Tag', 'Category', 'ngProgressFactory', function ($scope, $routeParams, Article, Tag, Category, ngProgressFactory) {
    var progressBar = ngProgressFactory.createInstance()
    var articleId = $routeParams.articleId
    progressBar.start() 
    async.auto({
      tags: function (done) {
        Tag.all(function (tags) {
          done(null, tags)
        })
      },
      categories: function (done) {
        Category.all(function (categories) {
          done(null, categories)
        })
      },
      article: function (done) {
        Article.get({articleId: articleId}, function (result) {
          done(null, result)
        })
      }
    }, function (err, results) {
      $scope.tags = results.tags
      $scope.categories = results.categories
      $scope.article = results.article
      progressBar.complete() 
    })

    $scope.save = function () {
      var success = function () {
        progressBar.complete() 
      }
      progressBar.start() 
      if ($scope.article._id) {
        $scope.article.$update({articleId: $scope.article._id}, success)
      } else {
        $scope.article.$save(success)
      }
    }
  }])

  .filter('categoryName', function () {
    return function (value, categories) {
      var category = _.find(categories, {_id: value}) || {}
      return category.name
    }
  })
