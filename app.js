var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var morgan = require('morgan');


const swaggerUi = require('swagger-ui-express');
require('dotenv-flow').config({path:'config/'});


var app = express();

var axios = require('axios');

var registered = false;

function register_kong() {
  axios
      .post('http://kong:8081/services/', {
        name: process.env.APP_NAME,
        url: 'http://' + process.env.APP_NAME
      })
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
        return false;
      })

  axios
      .post('http://kong:8081/services/' + process.env.APP_NAME + '/routes', {
        paths: ["/" + process.env.APP_NAME],
        name: process.env.APP_NAME
      })
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
        return false;
      })
  return true;
}

while (registered === false) {
  registered = register_kong();
}


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
var helloAllRouter = require('./routes/hello');
var productsRouter = require('./routes/products');
var clientsRouter = require('./routes/clients');

// Create a redirection
// ex : app.use('<redirection>', <route varname>)

app.use('/', indexRouter);
app.use('/decisionnel/hello', helloRouter);
app.use('/decisionnel/hello/all', helloAllRouter);
app.use('./decisionnel/clients', clientsRouter);
app.use('./decisionnel/produits', productsRouter);

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

