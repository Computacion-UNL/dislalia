var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var flash = require('connect-flash');
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Server Juego Serio API",
      version:"1.0.0"
    },
    server:[
      {
        url:"http://localhost:3000"
      }
    ]
  }, 
  apis:[`${path.join(__dirname,"./routes/*.js")}` ],

}

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session to control login

app.use(session({
    secret:'game',
    resave: false,
    saveUninitialized: true
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api-doc",
        swaggerUI.serve, 
        swaggerUI.setup(swaggerJsDoc(swaggerSpec))
        );

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
