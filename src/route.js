// Generated by CoffeeScript 1.9.2
(function() {
  var _oneHour, async, blogServer, clients, httpProxy, proxyServer, request;

  request = require('request');

  async = require('async');

  httpProxy = require('http-proxy');

  clients = (require('./config')).clients;

  _oneHour = 60 * 60 * 1000;

  blogServer = {
    target: "http://127.0.0.1:10080"
  };

  proxyServer = httpProxy.createProxyServer({});

  module.exports = function(server) {
    return server.use('/api', function(req, res, next) {
      console.log(req.url);
      return proxyServer.web(req, res, blogServer);
    });
  };

}).call(this);