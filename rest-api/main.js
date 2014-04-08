'use strict';

var express = require('express');
var mysql =  require('mysql');
var orm = require('orm');
var app = express();

var db = orm.connect("mysql://shoppinguser:test1234@127.0.0.1/shopping", function (success, db) {
    if (!success) {
        console.log("Could not connect to database!");
        return;
    } else {
        console.log("Connected to database !!!")
        return;
    }
});

var Event = db.define('event', {
    type: { type: "text" },
    ean: { type: "number" },
    created: { type: "date" },
    amount: { type: "number" }
 });

// synchronize the model definition to the database (only first creation, no modifications supported)
Event.sync();

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

    var newEvent = new Event({
        "type": event.type,
        "ean": event.ean,
        "created": new Date(event.date),
        amount: event.amount
    });

    newEvent.save(function (err, createdEvent) {
        if (!err) {
            console.log("Saved! ID=" + createdEvent.id);
            res.statusCode = 201;
            res.send(JSON.stringify({id: createdEvent.id, message: "ok"}));
        } else {
            console.log("Something went wrong...");
            console.dir(err);
            res.statusCode = 400;
            res.send(JSON.stringify({message: "nok"}));
        }
    });
});



var server = app.listen(9010, function() {
    console.log('Listening on port %d', server.address().port);
});

