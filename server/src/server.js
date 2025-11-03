// alias
require('module-alias/register')

const path = require('path')
// const glob = require('glob')
const http = require('http')
const express = require('express')

const useBodyParser = require('./utils/use-body-parser')
const useCookieParser = require('./utils/use-cookie-parser')
const useSession = require('./utils/use-session')
const useLog = require('./utils/use-log')
const useRoutes = require('./routes') // 中间件
const dbConnect = require('./utils/db-connect') // 链接数据库

const app = express()
app.use('/static', express.static(path.resolve(__dirname, '..', 'static')))
app.set('views', path.resolve(__dirname, '..', 'static-ejs'))
app.set('view engine', 'ejs')
// 设置请求体大小的限制为10MB
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

useBodyParser(app)
useCookieParser(app)
useSession(app)
useLog(app)
useRoutes(app)

dbConnect(() => {
  const server = http.createServer(app, { cookie: true })
  server.listen(3000, function () { console.log('listening on ***************************:3000') })
})