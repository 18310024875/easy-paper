const fs = require('fs')
const path = require('path')

function getNowStr() {
  const now = new Date()
  const y = now.getFullYear()
  const m = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)
  const d = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
  const hh = now.getHours() > 9 ? now.getHours() : '0' + now.getHours()
  const mm = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()
  const ss = now.getSeconds()
  const nowStr = `${y}-${m}-${d}_${hh}-${mm}-${ss}`
  return nowStr
}

function handleOneFile(file, uid, success, error) {
  // 暂存地址
  let tmp_path = file.path
  // 文件原名
  let _originalname = file.originalname
  let originname = Buffer.from(_originalname, "latin1").toString("utf-8")

  // 拓展名
  let ext = file.originalname.split('.').pop()
  // 文件大小 
  let size = file.size
  // 赋值唯一名字
  let indexname = `${uid || ''}_time${getNowStr()}_${originname}`
  // 服务器地址
  let serverPath = `/static/files/${indexname}`
  // 存在服务器物理地址
  let dirPath = path.resolve(__dirname, '..', '..', 'static', 'files', indexname)

  // 组合信息copy后返回
  let fileObj = {
    creator: uid,
    originname,
    size,
    serverPath,
    dirPath
  }

  // 复制暂存文件到指定地点
  fs.copyFile(tmp_path, dirPath, async (err) => {
    if (err) return error && error('copy file 失败')

    success(fileObj)

    // 删除暂存文件
    fs.unlink(tmp_path, () => { });
  })
}

async function uploadFiles(files, uid) {
  let list = []
  files.map((file, index) => {
    list.push(new Promise((resolve, rejected) => {
      // 处理文件
      handleOneFile(file, uid, (row) => {
        resolve(row)
      }, () => {
        resolve(null)
      })
    }))
  })
  return await Promise.all(list)
}

module.exports = {
  handleOneFile,
  uploadFiles
}