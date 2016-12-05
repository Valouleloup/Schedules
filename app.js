var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs'),
    PythonShell = require('python-shell');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

// Load jsdom, and create a window.
var jsdom = require("jsdom").jsdom;
var doc = jsdom();
var window = doc.defaultView;

// Load jQuery with the simulated jsdom window.
var $ = require('jQuery');
$().jquery;

// Dossier root fichiers
app.use(express.static(__dirname + '/'));

// Home page
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

console.log('Server ON');

var clusters;
var clustersParsed;

io.sockets.on('connection', function (socket) {

    /** 1 - Create position */
    socket.on('create_position', function() {

        PythonShell.run('C:\\Python27\\kmeans01.py', function (err, results) {
            clusters = results;
            clustersParsed = JSON.parse(clusters[0]);

            console.log(clustersParsed);
            socket.emit('return_info', clustersParsed);
        });
    });

});

server.listen(process.env.PORT || 8080);
