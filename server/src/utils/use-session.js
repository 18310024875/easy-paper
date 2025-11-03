const session = require('express-session')

module.exports = function (app) {
  app.use(session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // 默认过期0秒
      maxAge: 86400000
    }
  }))
}