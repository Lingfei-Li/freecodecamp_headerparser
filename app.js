var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

app.set('port', (process.env.PORT || 1234));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('*', (req, res) => {
    console.log(req.connection.remoteAddress);
    console.log(req.headers['x-forwarded-for']);
    var str = req.connection.remoteAddress + ' ' + req.headers['x-forwarded-for'];
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    res.send(ip);
});



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

