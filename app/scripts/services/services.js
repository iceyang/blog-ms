'use strict'

angular.module('DataCenterServices', ['ngResource'])
  .factory('Article', ['$resource', function ($resource) {
    return $resource('api/articles/:articleId', {}, {
      query: {method: 'POST', params: {articleId: 'query'}, isArray: false}
    })
  }])
