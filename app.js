var createError = require('http-errors');
var express = require('express');
var multer = require('multer')
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('express-session')({
  secret: 'asuydgabsydgtbhasu',
  cookie: {
    maxAge: 1000 * 60 * 60 * 3 // 3 hour
  },
  store: store,
  resave: false, //don't save session if unmodified
  saveUninitialized: true
}));


function checkLogin(req, res, next) {
    if (req.session.user) {
        next(); //If session exists, proceed to page
    } else {
        res.redirect('/');
    }
}

function checkLoginForApis(req, res, next) {
    if (req.session.user) {
        next(); //If session exists, proceed to page
    } else {
        res.json({ result: "Error", message: "Session is not valid. Please login first" });
    }
}


app.use('/', loginRouter);
app.use('/user', checkLoginForApis, usersRouter);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/portal_content';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var store = new MongoDBStore({
  uri: mongoDB,
  collection: 'portalSessions'
});

// Catch errors
store.on('error', function(error) {
  console.log("error", error);
  // assert.ifError(error);
  // assert.ok(false);
});

// app.get('/session', function(req, res) {
//   console.log("what's in session", req.session);
//   res.send('Hello ' + JSON.stringify(req.session));
// });

app.get('/isAuthenticated', function(req, res) {
  console.log("in get req of /isAuthenticated", req.session);
    if (req.session.user) {
        res.json({ result: "Success", message: "Session valid", userId: req.session.user, role: req.session.role });
    } else {
        res.json({ result: "Error", message: "Session not valid" });
    }
});

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.")
    });
    res.redirect('/');
});

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
