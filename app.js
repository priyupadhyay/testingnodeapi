var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');
var ui = require('./routes/ui');
var subjects = require('./routes/subjects');
var questions = require('./routes/questions');
var chapters = require('./routes/chapters');
var topics = require('./routes/topics');
var countdata = require('./routes/countdata');
var questionpaper = require('./routes/questionpaper');
var tests = require('./routes/tests');
var groups = require('./routes/groups');
var conversations = require('./routes/conversations');
var searches = require('./routes/searches');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Database connection
app.use(function(req, res, next){
  global.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password     : 'password',
      database : 'myschool'
  });
  connection.connect();
  next();
});

app.use('/', index);
app.use('/ui', ui);
app.use('/api/v1/users', users);
app.use('/api/v1/subjects', subjects);
app.use('/api/v1/questions', questions);
app.use('/api/v1/chapters', chapters);
app.use('/api/v1/topics', topics);
app.use('/api/v1/countdata', countdata);
app.use('/api/v1/questionpaper', questionpaper);
app.use('/api/v1/tests', tests);
app.use('/api/v1/groups', groups);
app.use('/api/v1/conversations', conversations);
app.use('/api/v1/searches', searches);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//connection.end();

module.exports = app;
