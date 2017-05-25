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

passport.use(new LocalStrategy(
  function (username, password, done) {
    var user = username
    if (user == 'johny') {
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

// login the user to the website and show the home page
router.post('/login', passport.authenticate('local', { successRedirect: 'https://www.google.com', failureRedirect: 'https://www.bing.com' }), function (req, res) {
  // res.render('login')
})

router.get('/logout', function (req, res) {
  req.logout()
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // req.flash('error_msg','You are not logged in');
    res.redirect('http://localhost:3000/')
  }
}

router.get('/auth', ensureAuthenticated, function (req, res) {
  res.send('you are authenticated')
})

module.exports = router
