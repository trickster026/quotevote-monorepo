var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function (username, password, done) {
    var user = username
    if (user === 'johny') {
      var err = 'error'
      done(err)
    } else {
      done(null, user)
    }
  }))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  // User.getUserById(user, function (err, user) {
  //   done(err, user)
  // })
  done(null, user)
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // req.flash('error_msg','You are not logged in');
    res.redirect('http://localhost:3000/')
  }
}

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/home', ensureAuthenticated, function (req, res) {
  res.render('home')
})

router.get('/scoreBoard', ensureAuthenticated, function (req, res) {
  res.render('scoreBoard')
})

router.get('/:artistName', ensureAuthenticated, function (req, res) {
  res.render('artist')
})

router.get('/:userName', ensureAuthenticated, function (req, res) {
  res.render('user')
})

module.exports = router
