var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
var statistics = require('./routes/statistics');
var flash = require('connect-flash');

var handlebars = require('express-handlebars')
         .create({defaultLayout:'main'});
         
var settings = require('./settings/settings');
var app = express();

// 设置模板引擎 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

//设置允许flash 消息
app.use(flash());

//通过数据库存储session
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
        url: settings.url
  }),
  resave: true,
	saveUninitialized: true

}));


// app.use(session({
//   cookie:{maxAge:3600000},
//   secret:settings.cookieSecret,
//   store:new MongoStore({db:settings.cookieSecret})}));


//设置flash消息
app.use(function(req, res, next){
// if there's a flash message, transfer
// it to the context, then clear it
res.locals.flash = req.session.flash;
res.locals.user = req.session.user;
delete req.session.flash;
next();
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态服务
app.use(express.static(path.join(__dirname, 'public')));

//设置调试
app.use(function(req, res, next){
res.locals.showTests = app.get('env') !== 'production' &&
                    req.query.test === '1';
            next();
});


//设置路由
app.use('/', routes);
app.use('/users', users);
app.use('/about',users); //  ------
app.use('/statistics',statistics); //  ------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
 // res.render('404');
  next(err);
});

app.use(function(req, res, next) {

  err.status = 404;
  res.render('404');

});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

*/

app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
  /*res.render('500', {
    message: err.message,
    error: {}
  });
  */
  console.error(err.stack);
  res.status(500);
  res.render('500');
});










module.exports = app;
