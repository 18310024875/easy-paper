const express = require('express')
const userModel = require('@/models/user')
const { getType, sendSuccess, sendWarning, sendError } = require('@/utils/handle-res')
const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { session, query, body } = req
  try {
    let { account, password } = body
    let data = await userModel.find({
      account: {
        "$in": [account]
      },
      password: {
        "$in": [password]
      }
    })
    if (data && data[0]) {
      session['userId'] = data[0].account
      
      sendSuccess(res, data[0])
    } else {
      sendWarning(res, '账号或密码错误', 301)
    }
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/add', async (req, res, next) => {
  const { query, body } = req
  try {
    let { account, password } = body
    let items = [{ account, password, name: `user_${new Date().valueOf()}` }]
    let data = await userModel.insertMany(items)
    sendSuccess(res, data)
  } catch (e) {
    console.log(e);
    sendError(res, e)
  }
})

module.exports = router