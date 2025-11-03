module.exports = function (app) {
  app.use(`/api/company`, require('./core/company'))
  app.use(`/api/project`, require('./core/project'))
  app.use(`/api/module`, require('./core/module'))
  app.use(`/api/user`, require('./user'))
}
