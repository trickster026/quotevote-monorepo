var express = require('express')
var app = express()
var server = require('http').createServer(app)

server.listen(3000)

var io = require('socket.io').listen(server)
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var path = require('path')

io.on('connection', function (socket) {
  console.log('A user connected')
  // Send a message after a timeout of 4seconds
  setTimeout(function () {
    socket.send('message sent from socket io after 4 seconds')
  }, 4000)
  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
  })
})

// connect to database
mongoose.connect('mongodb://localhost:27017/myappdatabase')

// require routes
var routes = require('./routes/index')
var users = require('./routes/users')

// initialise express app
// var app = express()

// set views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.set('port', 3000)

// bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// cokkieParser
app.use(cookieParser())
// session middleware
app.use(session({
  secret: 'somerandomchars',
  saveUninitialized: true,
  resave: true
}))
// initialize passport (note: make sure to use passport.session after initializing session middleware)
app.use(passport.initialize())
app.use(passport.session())

// connect-flash middleware
app.use(flash())
// set static folder
app.use(express.static('public'))

// routes
app.use('/', routes)
app.use('/users', users)

// app.listen(3000 , function () {
//   console.log('server started on port 3000');
// });

// app.listen(app.get('port'), function () {
//   console.log('Express web server is listening on port ' + app.get('port'))
// })
