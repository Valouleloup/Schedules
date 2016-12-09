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

// set the view engine to ejs
app.set('view engine', 'ejs');

// Home page
/*app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});*/

// Home page
app.get('/', function (req, res) {
  res.render('index');
});

//Travel time page
app.get('/traveltime', function (req, res) {
    res.render('traveltime');
});

//DTW page
app.get('/dtw', function (req, res) {
  res.render('dtw');
});

//K-Means page
app.get('/kmeans', function (req, res) {
  res.render('kmeans');
});

//RIPPER page
app.get('/ripper', function (req, res) {
  res.render('ripper');
});

//Horaires page
app.get('/horaires', function (req, res) {
  res.render('horaires');
});

console.log('Server ON');

var colors = ['rgba(228,76,76,0.8)', 'rgba(224,177,91,0.8)', 'rgba(132,205,86,0.8)', 'rgba(86,205,195,0.8)',
    'rgba(98,118,247,0.8)', 'rgba(212,95,233,0.8)', 'rgba(5,131,74,0.8)', 'rgba(120,20,9,0.8)'];
var clusters;
var clustersParsed;

io.sockets.on('connection', function (socket) {

    /** K-MEANS */
    socket.on('get_kmeans', function() {

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

            //console.log(series);
            console.log('K-Means ok');
            socket.emit('return_info', series);
        });

    });

    /** RIPPER */
    socket.on('get_ripper', function() {

        var exec = require('child_process').exec;
        var child = exec('java -jar C:\\Python27\\java\\RipperProject.jar C:\\Python27\\java\\test05.txt',
            function (error, stdout, stderr){
                var ripperData = JSON.parse(stdout);
                //var rip = ["49.72375690607735",[["(christmastime = TRUE)","6"],["(daytype = weekend_holiday) and (eastertime =TRUE)","4"],["(daytype = weekend_holiday) and (month = 2)","4"],["(daytype = weekend_holiday) and (month = 3)","4"],["(daytype = holiday)","5"],["(daytype = weekend_holiday)","5"],["(nonschoolperiod = FALSE)","3"],["null","2"]],"8"];
                //console.log(ripperData);
                console.log('Ripper ok');
                socket.emit('return_info_ripper', ripperData);
                if(error !== null){
                    console.log(error);
                }
            });

    });

    /** DTW */
    socket.on('get_dtw', function() {
        /*PythonShell.run('C:\\Python27\\dtw1.py', function (err, results) {
            var series = results;
            var parsedSeries = JSON.parse(series[0]);

            //console.log(parsedSeries);
            console.log('DTW ok');
            socket.emit('return_info_dtw', parsedSeries);
         });*/

        PythonShell.run('C:\\Python27\\dtw2.py', function (err, results) {
            var parsedVariances = JSON.parse(results[0]);

            console.log('DTW ok');
            socket.emit('return_info_dtw', parsedVariances);
            });

    });

});

server.listen(process.env.PORT || 8080);
