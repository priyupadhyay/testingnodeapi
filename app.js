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
var questions = require('./routes/chapters');
var questions = require('./routes/topics');
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

module.exports = app;