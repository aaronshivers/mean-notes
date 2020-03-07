const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    // unique: true,
    // lowercase: true,
    // trim: true,
    // minlength: 5,
    // maxlength: 100,
  },
  password: {},
  createdAt: {}
})

const User = mongoose.model('User', userSchema)

module.exports = User
