var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs'),
    PythonShell = require('python-shell');

var clusters = [];

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

// Load jsdom, and create a window.
var jsdom = require("jsdom").jsdom;
var doc = jsdom();
var window = doc.defaultView;

// Load jQuery with the simulated jsdom window.
var $ = require('jQuery');
$().jquery;

$.get( "https://api-2445581154346.apicast.io/positions?user_key=6ce102b1290d319c0738355a0766f392", function(dataFromPosition) {
}).done(function(data) {
    console.log( 'Full get ok' );
}).fail(function(err) {
    console.log( err );
});

// Dossier root fichiers
app.use(express.static(__dirname + '/'));

// Home page
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

console.log('Server ON');

io.sockets.on('connection', function (socket) {

    /** 1 - Create position */
    socket.on('create_position', function(params) {
        //a
    });

});

server.listen(process.env.PORT || 8080);
