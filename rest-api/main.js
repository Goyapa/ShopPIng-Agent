'use strict';

var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.post('/rest/event', function(req, res) {
    var event = req.body;
    console.log('Adding Event: ' + JSON.stringify(event));
    res.send(JSON.stringify({id: 'to be done', message: "ok"}));
});



var server = app.listen(9010, function() {
    console.log('Listening on port %d', server.address().port);
});

