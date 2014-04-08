'use strict';

var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

var server = app.listen(9010, function() {
    console.log('Listening on port %d', server.address().port);
});
