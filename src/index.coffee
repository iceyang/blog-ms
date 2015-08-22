path = require 'path'
cookieParser = require 'cookie-parser'
express = require 'express'

base = path.relative process.cwd(), __dirname

app = do express
app.use express.static "#{path.join base, '../app'}"
app.use cookieParser()

route = require './route'
route app

process.on 'uncaughtException', (err)->
  console.log err

app.listen 10081, (err)->
  console.log err or "running at http://127.0.0.1:10081"
