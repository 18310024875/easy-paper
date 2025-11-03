const express = require('express')
const projectModel = require('@/models/core-project')
const { getType, sendSuccess, sendWarning, sendError } = require('@/utils/handle-res')
const router = express.Router()

router.post('/getProjectsByCompanyid', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { companyId } = body
    let data = await projectModel.aggregate([
      {
        $addFields: {
          _companyId: { $toObjectId: '$companyId' }
        }
      },
      {
        $lookup: {
          from: 'companies',
          localField: '_companyId',
          foreignField: '_id',
          as: 'companies'
        }
      },
      {
        $match: {
          companyId: {
            $in: [companyId]
          }
        },
      }
    ])
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/get', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { projectId } = body
    let data = await projectModel.find({
      _id: {
        "$in": [projectId]
      }
    })
    sendSuccess(res, data?.[0])
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/add', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { companyId, name } = body
    let items = [{ creatorId: userId, companyId, name }]
    let data = await projectModel.insertMany(items)
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/update', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { id, name, pageListStr } = body
    let ids = [id]
    let item = { name, pageListStr }
    let data = await projectModel.updateMany({
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
    let data = await projectModel.deleteMany({
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