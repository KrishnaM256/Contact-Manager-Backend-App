const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please Enter Your Name!'],
    },
    email: {
      type: String,
      required: [true, 'please Enter Your Email!'],
    },
    password: {
      type: String,
      required: [true, 'please Enter Your Name!'],
    },
  },
  { Timestamp: true }
)

module.exports = mongoose.model('User', userSchema)
