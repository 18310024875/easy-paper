const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String
  },
  companyId: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },

  originname: {
    type: String
  },
  size: {
    type: Number
  },
  serverPath: {
    type: String
  },
  dirPath: {
    type: String
  }
})

const model = mongoose.model('module', schema);

module.exports = model