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
    rest.get(host + 'rest/event')
        .on('complete', function (data, response) {
            res.json(data);
        }).on('error', function (data, response) {
            console.log("Error: " + JSON.data);
        });
};