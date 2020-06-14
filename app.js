// var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var ipfilter = require('express-ipfilter').IpFilter;


var app = express();

// Whitelist the following IPs
var WhitelistIPs = process.env.WHITELIST_IP.split(' ');
app.use(ipfilter(WhitelistIPs, {
    mode: 'allow'
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};


    // console.log("====err handler====", err.status, err && err.message)

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    // res.render('error', { error: err });

    // res
    //     .status(err.status || 500)
    //     .send(err.message)
console.log("===check===", err)

    res.status(err.status || 500).json({
        message: err.message,
        errors: (err && err.data) || {}
    });

    // return res.status(422).json({
    //     errors: result.array()
    // });
});

app.listen(process.env.HOST_PORT, async function () {
    console.log("Server started at http://localhost:%s", process.env.HOST_PORT);
});

module.exports = app;