
var host = "http://localhost:9010/";


//var host = "http://192.168.178.120:9010/";
//var host = "http://192.168.178.81:9010/";

var _ = require("underscore");
var rest = require('restler');

var tokens = [
    {token: "EAN", pattern: /^([0-9]{8,13})$/},
    {token: "AMOUNT", pattern: /^([-+]?[0-9]([0-9]?))$/},
    {token: "AGAIN", pattern: /^$/},
    {token: "MODE_INCOMING", string: "Einkauf"},
    {token: "MODE_INCOMING", string: "in"},
    {token: "MODE_INCOMING", string: "/+"},
    {token: "MODE_OUTGOING", string: "Verbrauch"},
    {token: "MODE_OUTGOING", string: "out"},
    {token: "MODE_OUTGOING", string: "/-"},
    {token: "EXIT",     string: "exit"}
];


var classify_input = function (line) {
    for (var i in tokens) {
        rule = tokens[i];
        var matches = ((rule.pattern && rule.pattern.test(line)) ||
            (rule.string && rule.string == line));
        if (matches) {
            return rule.token;
        }
    }
    ;
    return undefined;
}


var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('?? > ');
rl.prompt();


function now() {
    return new Date().getTime();
}


function emit(mode, ean, amount) {
    var jsonData = {
        "type": mode,
        "ean": ean,
        "date": now(),
        "amount": amount
    };
    rest.postJson(host + 'rest/event', jsonData)
        .on('complete', function (data, response) {
            console.log(data);
        }).on('error', function(data, response) {
            console.log("Error: "+JSON.data);
        });

    console.log(JSON.stringify({"type": mode, "ean": ean, "amount": amount, "timestamp": now()}));
};

var mode = undefined;
var ean = undefined;
var lastEvent = undefined;


rl.on('line', function (line) {
    line = line.trim();
    if (!(lastEvent > now() - 15 * 60 * 1000)) {
        mode = undefined;
        ean = undefined;
    }
    lastEvent = now();

    switch (classify_input(line)) {
        case "MODE_INCOMING":
            mode = "in";
            ean = undefined;
            console.log("Set mode to in");
            break;
        case "MODE_OUTGOING":
            mode = "out";
            ean = undefined;
            console.log("Set mode to out");
            break;
        case "AGAIN":
            if (mode && ean) {
                emit(mode, ean, 1);
            }
            console.log("again");
            break;
        case "AMOUNT":
            if (mode && ean) {
                emit(mode, ean, parseInt(line));
            }
            console.log("amount");
            break;
        case "EAN":
            ean = line;
            if (mode) {
                emit(mode, ean, 1);
            }
            break;
        case "EXIT":
            console.log("exit process...");
            process.exit(0);
            break;
    }
    if (mode) {
        rl.setPrompt(mode + "> ");
    } else {
        rl.setPrompt("??> ")
    }
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});
