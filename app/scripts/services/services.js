'use strict'

angular.module('DataCenterServices', ['ngResource'])
  .factory('System', ['$resource', function ($resource) {
    return $resource('api/:clientId/resource/system/:type', {}, {
      base: {method: 'GET', params: {type: 'base'}},
      all: {method: 'GET', url: 'all', isArray: true}
    })
  }])
  .factory('Cpu', ['$resource', function ($resource) {
    return $resource('api/:clientId/resource/cpu/:type', {}, {
      base: {method: 'GET', params: {type: 'base'}},
      loadAvg: {method: 'GET', params: {type: 'load_avg'}},
      intensiveProcesses: {method: 'GET', params: {type: 'intensive_processes'}}
    })
  }])
