var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs');

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
