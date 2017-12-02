var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Song = require('../models/song')

router.get('/addSong', function (req, res) {
  res.render('song')
})

router.post('/addSong', function (req, res) {
  var io = req.io;
  
  var artistName = req.body.artistName
  var songName = req.body.songName
  var albumName = req.body.albumName
  var releaseYear = req.body.releaseYear
  var featuredArtists = req.body.featuredArtists
  
  console.log(req.body)
  //connect to mongodDB
  mongoose.connect('mongodb://localhost/shuzu_test');
  var db = mongoose.connection;
  //error handler for mongoDB connection
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function callback() {
    console.log("connection opened to mongoDB");

    var newSong = new Song({
      artistName: artistName,
      songName: songName,
      albumName: albumName,
      releaseYear: releaseYear
    })

    newSong.save()
    //emit socket event 
    io.emit('testevent', 'A new song has been added to database'); 
    res.send('song added')
    //close connection to mongoDB
    mongoose.connection.close()

  });

})

module.exports = router