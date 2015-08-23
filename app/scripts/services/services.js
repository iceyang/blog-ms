'use strict'

angular.module('DataCenterServices', ['ngResource'])
  .factory('Article', ['$resource', function ($resource) {
    return $resource('api/articles/:articleId', {}, {
      query: {method: 'POST', params: {articleId: 'query'}, isArray: false},
      update: {method: 'PUT'}
    })
  }])
  .factory('Tag', ['$resource', function ($resource) {
    return $resource('api/tags/:tagId', {}, {
      all: {method: 'GET', params: {tagId: 'all'}, isArray: true}
    })
  }])
  .factory('Category', ['$resource', function ($resource) {
    return $resource('api/categories/:categoryId', {}, {
      all: {method: 'GET', params: {categoryId: 'all'}, isArray: true}
    })
  }])
