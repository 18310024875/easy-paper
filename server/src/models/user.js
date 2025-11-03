const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  age: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const model = mongoose.model('user', schema);

module.exports = model