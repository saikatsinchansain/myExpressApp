var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoService = require('./services/mongo.service')
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const db = require("./models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lotteryRouter = require('./api/lottery');
var profileRouter = require('./api/profile');

const showBanner = require('node-banner');
 
(async () => {
    await showBanner('Malamal Lottery', 'Gamble your way to riches!','white');
})();

var app = express();

const sequelize = new Sequelize('db', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

mongoService.connect(err => {
  if (err) {
    console.log("Error: ", err);
    process.exit(1);
  }
  mongoService.initialize()
});

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/lottery',lotteryRouter)
app.use('/api/profile',profileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
