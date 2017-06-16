var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

router.get('/register', function (req, res) {
  res.render('register')
})

// save registered user to database and redirect to login page
router.post('/register', function (req, res) {
  var name = req.body.name
  var email = req.body.email
  var username = req.body.username
  var password = req.body.password
  // var password2 = req.body.password2

  var newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  })

  newUser.save()

  res.render('index')
})

router.get('/logout', function (req, res) {
  req.logout()
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('http://localhost:3000/')
  }
}

module.exports = router
