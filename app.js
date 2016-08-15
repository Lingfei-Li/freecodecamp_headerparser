var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uaParser = require('ua-parser');


var app = express();

app.set('port', (process.env.PORT || 1234));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('*', (req, res) => {
    res.json(getClientInfo(req));
});

var getClientInfo= (req)=>{
    var ipaddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'].split(',')[0];
    var software = uaParser.parseOS(req.headers['user-agent']).toString();
    return {
        ipaddress,
        language,
        software
    };
};



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

