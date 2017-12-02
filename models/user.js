var mongoose = require('mongoose')

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('User', UserSchema)
