// Generated by CoffeeScript 1.9.2
(function() {
  var app, base, cookieParser, express, path, route;

  path = require('path');

  cookieParser = require('cookie-parser');

  express = require('express');

  base = path.relative(process.cwd(), __dirname);

  app = express();

  app.use(express["static"]("" + (path.join(base, '../app'))));

  app.use(cookieParser());

  route = require('./route');

  route(app);

  process.on('uncaughtException', function(err) {
    return console.log(err);
  });

  app.listen(10090, function(err) {
    return console.log(err || "running at http://127.0.0.1:10090");
  });

}).call(this);
