var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var morgan = require('morgan');


const swaggerUi = require('swagger-ui-express');
require('dotenv-flow').config({path:'config/'});


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("combined"));

const options = {
  definition: {
    swagger: '2.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: process.env.APP_NAME, // Title (required)
      version: '1.0.0', // Version (required)
    },
    servers : [{"url" : "/", "description" : "Local dev"}]
    },

  // Path to the API docs
  apis: ['models/*.js', 'routes/*.js', 'controller/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**********************************************************************/
/*                             [FIX ME]                               */
/**********************************************************************/

// define a path to a route file
// ex : var <route varname> = require('<relative path>')

var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');
var helloAllRouter = require('./routes/hello')


// Create a redirection
// ex : app.use('<redirection>', <route varname>)

app.use('/', indexRouter);
app.use('/decisionnel/hello', helloRouter);
app.use('/decisionnel/hello/all', helloAllRouter);


/**********************************************************************/
/**********************************************************************/

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

