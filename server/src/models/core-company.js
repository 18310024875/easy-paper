const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  creatorId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
})

const model = mongoose.model('company', schema);

module.exports = model