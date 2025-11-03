const path = require('path')
const multer = require('multer')

const multerIt = multer({
  dest: path.join(__dirname, '..', '..', './temp-upload'),
  limits: {
    fileSize: 104857600
  }
})

module.exports = multerIt