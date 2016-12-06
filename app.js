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

var colors = ['rgba(228,76,76,0.8)', 'rgba(224,177,91,0.8)', 'rgba(132,205,86,0.8)', 'rgba(86,205,195,0.8)',
    'rgba(98,118,247,0.8)', 'rgba(212,95,233,0.8)', 'rgba(5,131,74,0.8)', 'rgba(120,20,9,0.8)'];
var clusters;
var clustersParsed;

io.sockets.on('connection', function (socket) {

    /** 1 - Create position */
    socket.on('create_position', function() {

        PythonShell.run('C:\\Python27\\kmeans01.py', function (err, results) {
            clusters = results;
            clustersParsed = JSON.parse(clusters[0]);

            var series = [];

            var i = 1;
            clustersParsed.forEach(function(cluster){
                var group = {
                    name: 'Cluster ' + i,
                    color: colors[i-1],
                    data: cluster
                };
                series.push(group);
                i++;
            });

            console.log(series);
            socket.emit('return_info', series);
        });
    });

});

server.listen(process.env.PORT || 8080);
