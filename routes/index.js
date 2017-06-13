var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/home', function (req, res) {
  res.render('home')
})

router.get('/scoreBoard', function (req, res) {
  res.render('scoreBoard')
})

router.get('/:artistName', function (req, res) {
  res.render('artist')
})

router.get('/:userName', function (req, res) {
  res.render('user')
})

module.exports = router
