module.exports = function (app) {
  app.use(`/public-api/user`, require('./user'))
}