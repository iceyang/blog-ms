request = require 'request'
async = require 'async'
httpProxy = require 'http-proxy'

clients = (require './config').clients

_oneHour = 60 * 60 * 1000

blogServer =
  target: "http://127.0.0.1:10080"
proxyServer = httpProxy.createProxyServer {}

module.exports = (server)->
  server.use '/api', (req, res, next)->
    console.log req.url
    return proxyServer.web req, res, blogServer
