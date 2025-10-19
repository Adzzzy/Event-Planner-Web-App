var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mysql = require('mysql2');
var session = require('express-session');
var app = express();

var dbConnectionPool = mysql.createPool({
    //if the database is running on the same host as the express server, use localhost
    host: 'db', //if running database in separate docker container, then reference that container's name to connect to instead of localhost, as that will resolve to the dynamic ip given to the container by compose
    database: 'EventManagement',
    user: 'root',
    password: ''
});

app.use(function (req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'afshgrjgnksiuhwiuhiurgn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;