var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')

passport.use(new LocalStrategy(
  function (username, password, done) {
    if (username === 'cod3ncoff33' && password === 'wateva' || username === 'flyblackbox' && password === 'hhsb1234') {
      var err = 'error'
      done(null, username)
    } else {
      done(null, false)
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

router.post('/login', passport.authenticate('local', { successRedirect: 'http://localhost:3000/home', failureRedirect: 'http://localhost:3000/' }), function (req, res) {
  // res.render('login')
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
