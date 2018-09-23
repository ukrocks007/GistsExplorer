var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
mongoose.connect('mongodb://admin:qwerty123@ds113003.mlab.com:13003/gists_explorer', {useNewUrlParser: true});

app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  // Connect Flash
  app.use(flash());
  
  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
  

app.get('/', (req, res) => {
    res.status(200);
    res.send();
});

app.all('*', (req, res) => {
    res.status(500);
    res.send('Invalid endpoint');
    res.end();
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
 console.log('running at localhost: ' + port);
});

module.exports=app;