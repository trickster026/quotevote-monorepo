var express = require('express')
var router = express.Router()

router.get('/addSong', function (req, res) {
  res.send('song')
})

router.post('/addSong', function(req, res) {
    
})

module.exports = router