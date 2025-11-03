const express = require('express')
const companyModel = require('@/models/core-company')
const { getType, sendSuccess, sendWarning, sendError } = require('@/utils/handle-res')
const router = express.Router()

router.post('/getCompanysByUserid', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let data = await companyModel.find({
      creatorId: {
        "$in": [userId]
      }
    })
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/add', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { name } = body
    let items = [{ creatorId: userId, name }]
    let data = await companyModel.insertMany(items)
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/update', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { id, name } = body
    let ids = [id]
    let item = { name }
    let data = await companyModel.updateMany({
      _id: {
        "$in": ids
      }
    }, {
      $set: {
        ...item
      }
    })
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/delete', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { id } = body
    let ids = [id]
    let data = await companyModel.deleteMany({
      _id: {
        "$in": ids
      }
    })
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

module.exports = router