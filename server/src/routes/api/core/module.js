const express = require('express')
const moduleModel = require('@/models/core-module')
const multerIt = require('@/utils/multer')
const { getType, sendSuccess, sendWarning, sendError } = require('@/utils/handle-res')
const { uploadFiles } = require('@/utils/handle-upload')
const router = express.Router()

router.post('/getModulesByProjectid', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { companyId, projectId } = body
    let data = await moduleModel.aggregate([
      {
        $addFields: {
          // _companyId: { $toObjectId: '$companyId' },
          _projectId: { $toObjectId: '$projectId' }
        }
      },
      // {
      //   $lookup: {
      //     from: 'companies',
      //     localField: '_companyId',
      //     foreignField: '_id',
      //     as: 'companies'
      //   }
      // },
      {
        $lookup: {
          from: 'projects',
          localField: '_projectId',
          foreignField: '_id',
          as: 'projects'
        }
      },
      {
        $match: {
          companyId: {
            $in: [companyId]
          },
          projectId: {
            $in: [projectId]
          }
        },
      }
    ])
    sendSuccess(res, data)
  } catch (e) {
    sendError(res, e)
  }
})

router.post('/add', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  // multer
  multerIt.array('uploadFiles', 10)(req, res, async (err) => {
    const { query: { companyId, projectId, name }, files } = req
    if (err) return sendError(res, err)
    // save
    try {
      const [{ originname, size, serverPath, dirPath }] = await uploadFiles(files, userId)
      const item = {
        creator: userId,
        name,
        companyId,
        projectId,

        originname,
        size,
        serverPath,
        dirPath
      }
      const data = await moduleModel.insertMany([item])
      sendSuccess(res, data)
    } catch (e) {
      sendError(res, e)
    }
  })
})

router.post('/delete', async (req, res, next) => {
  const { session: { userId }, query, body } = req
  try {
    let { id } = body
    let ids = [id]
    let data = await moduleModel.deleteMany({
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