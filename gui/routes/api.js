var http = require('http');
var rest = require('restler');
var host = "http://localhost:9010/";

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

exports.shop = function (req, res) {
    res.json(
        [
            { "type": "blub",
                "ean": "12345678",
                "date": 1388574059000,
                "amount": 1 },
            { "type": "blub",
                "ean": "12345678",
                "date": 1388574059000,
                "amount": 1 },
            { "type": "blub",
                "ean": "12345678",
                "date": 1388574059000,
                "amount": 1 }
        ]
    );
    /*
     rest.get(host + 'rest/event')
     .on('complete', function (data, response) {
     res.json(data);
     }).on('error', function (data, response) {
     console.log("Error: " + JSON.data);
     });
     */
};