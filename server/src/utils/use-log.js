const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

module.exports = function (app) {
  var logStream = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'server.log'), {
    flags: 'a'
  })

  app.use(morgan('combined', {
    stream: logStream
  }))
}