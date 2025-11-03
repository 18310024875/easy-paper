const express = require('express')
const userModel = require('@/models/user')
const { getType, sendSuccess, sendWarning, sendError } = require('@/utils/handle-res')
const router = express.Router()

router.post('/getMyCompany', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let data = await userModel.find({
      creatorId: {
        "$in": [userId]
      }
    })
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

module.exports = router