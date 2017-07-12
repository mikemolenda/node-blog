var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var expressValidator = require('express-validator');
var expressMessages = require('express-messages');
var flash = require('connect-flash');
var mongo = require('mongodb');

var db = require('monk')('localhost/node-blog');

var upload = multer({ dest: 'uploads/' });

var index = require('./routes/index');

var posts = require('./routes/posts');
var app = express();

// Set up global functions
app.locals.moment = require('moment');
app.locals.truncate = require('truncate-html');

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up parsing and path middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Set up Express Validator (form validation)
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param : formParam,
            msg: msg,
            value: value
        };
    }
}));

// Set up Connect-Flash (session messages)
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = expressMessages(req, res);
    next();
});

// Make DB accessible by router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// Set up routing
app.use('/', index);
app.use('/posts', posts);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
