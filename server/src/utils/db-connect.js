const mongoose = require('mongoose')
const mdb_url = 'mongodb://127.0.0.1:27017/SELF_DB'

module.exports = function (cb) {
  // 建立和MongoDB数据库的连接
  mongoose.connect(mdb_url, {
    useNewUrlParser: true, // 是否使用新的url地址转换方式
    useUnifiedTopology: true // 是否使用新的用户安全策略
  })
  //建立连接
  mongoose.connection.on('connected', function () {
    console.log('数据库连接成功！连接地址是：' + mdb_url)

    cb && cb()
  })
  // 连接异常
  mongoose.connection.on('error', function (err) {
    console.log('数据库连接异常！' + err)
  })
  // 断开连接
  mongoose.connection.on('disconnectied', function () {
    console.log('断开数据库的连接!')
  })
}