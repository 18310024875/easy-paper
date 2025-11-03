const usePublicApi = require('./public-api')
const useApi = require('./api')

module.exports = function (app) {
  // 后端资源跨域处理
  // app.all('/*', function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "")
  //   res.setHeader("Access-Control-Allow-Credentials", "true")
  //   res.setHeader("Access-Control-Allow-Headers", "Accept,X-Requested-With,Content-Type")
  //   res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  //   next()
  // })

  // public-api不校验登录
  app.all('/public-api/*', function (req, res, next) {
    next()
  })

  // 校验登录
  app.all('/api/*', function (req, res, next) {
    const { originalUrl, session } = req
    if (session['userId']) {
      next()
    } else {
      session['userId'] = 'admin'
      next()

      // res.status(401)
      // res.render('error.ejs', { str: '登录过期' })
    }
  })

  // 方法资源
  usePublicApi(app)
  useApi(app)
}