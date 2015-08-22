'use strict'

angular.module('clientControllers', ['DataCenterServices'])
  .controller('ClientIndexCtrl', ['$scope', '$routeParams', 'System', 'Cpu', 'Memory', 'Disk', 'Network', function ($scope, $routeParams, System, Cpu, Memory, Disk, Network) {
    $scope.clientId = $routeParams.clientId
    var params = {
      clientId: $routeParams.clientId
    }
    async.series([
      function (cb) {
        System.base(params, function (result) {
          $scope.system = result
          cb(null)
        })
      },
      function (cb) {
        Cpu.base(params, function (result) {
          $scope.cpu = result
          cb(null)
        })
      },
      function (cb) {
        Disk.base(params, function (result) {
          for(var disk of result) {
            if(disk.used.split("%")[0] >= 90) {
              disk.waringType = "danger"
            } else if(disk.used.split("%")[0] >= 70) {
              disk.waringType = "warning"
            } else {
              disk.waringType = "normal"
            }
          }
          $scope.disks = result
          cb(null)
        })
      },
      function (cb) {
        Memory.base(params, function (result) {
          result.memTotal = parseInt(result.memTotal.trim().split(" ")[0]/1024) + "MB"
          $scope.memory = result
          cb(null)
        })
      },
      function (cb) {
        Network.base(params, function (result) {
          if(!result) {
            return cb(null)
          }
          var ip = ""
          for(var a of result) {
            if(a.interface == "external") {
              ip = a.ip
              break
            }
          }
          $scope.network = {ip: ip}
          cb(null)
        })
      }
    , function (err) {
      console.log($scope)
    }])
  }])

  .controller('ClientCpuCtrl', ['$scope', '$routeParams', 'System', 'Cpu', 'Memory', 'Disk', 'Network', function ($scope, $routeParams, System, Cpu, Memory, Disk, Network) {
    $scope.clientId = $routeParams.clientId
  }])

  .controller('ClientMemoryCtrl', ['$scope', '$routeParams', 'System', 'Cpu', 'Memory', 'Disk', 'Network', function ($scope, $routeParams, System, Cpu, Memory, Disk, Network) {
    $scope.clientId = $routeParams.clientId
  }])

  .controller('ClientDiskCtrl', ['$scope', '$routeParams', 'System', 'Cpu', 'Memory', 'Disk', 'Network', function ($scope, $routeParams, System, Cpu, Memory, Disk, Network) {
    $scope.clientId = $routeParams.clientId
  }])

  .controller('ClientNetworkCtrl', ['$scope', '$routeParams', 'System', 'Cpu', 'Memory', 'Disk', 'Network', function ($scope, $routeParams, System, Cpu, Memory, Disk, Network) {
    $scope.clientId = $routeParams.clientId
  }])
