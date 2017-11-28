const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

// var morgan = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var session = require('express-session');


mongoose.connect('mongodb://localhost/pdt', {useMongoClient: true});

app.set('view engine', 'ejs');
app.set("views", "./app/views");
app.use(express.static('./app/public'));
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

//Passport Config
app.use(session({
  secret: 'treta',
  resave: false,
  saveUninitialized: false
 }))

app.use(passport.initialize());
app.use(passport.session());


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/pdt';

var MongoClient = MongoClient.connect(url, function(err, mongodb){
  var passportConfig = require('./passport')(passport, mongoose)
  const indexRoute = require('../app/routes/index')(app,passport, flash);
  const autenticar = require('../app/routes/autenticar')(app, passport);
  const logout = require('../app/routes/logout')(app, passport);
  const register = require('../app/routes/register')(app, passport);
  const signup = require('../app/routes/signup')(app, passport);
  const dshboardRoute = require('../app/routes/dshboard')(app, mongodb);
  const randomRoute = require('../app/routes/random')(app, mongodb);
  const zeraViews = require('../app/routes/zeraViews')(app, mongodb);
  const apagaLog = require('../app/routes/apagaLog')(app, mongodb);
  const socket = require('../app/socket/socket')(mongodb, io);
})

module.exports = http;
