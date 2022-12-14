let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');

let app = express();

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let productRouter = require('../routes/product');
let cartRouter = require('../routes/cart');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/checkout', productRouter);
app.use('/cart',cartRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
