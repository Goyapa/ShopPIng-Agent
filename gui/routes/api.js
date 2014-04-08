var http = require('http');

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

exports.shop = function (req, res) {

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    var responseBody = {};

    http.get("https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=2&since_id=14927799", function (res) {
        res.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            responseBody = Buffer.concat(bodyChunks);
        })
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });

    res.json(responseBody);
};