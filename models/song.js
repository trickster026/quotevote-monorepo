var mongoose = require('mongoose')

// User Schema
var SongSchema = mongoose.Schema({
  artistName: {
    type: String
  },
  songName: {
    type: String
  },
  albumName: {
      type: String
  },
  releaseYear: {
      type: String
  }
})

module.exports = mongoose.model('Song', SongSchema)
