var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports.start = _start;

var cache = [];

function _start(options, done) {
    options = options || {};
    options.port = options.port || 3000;

    app.use(express.static('./src/app/public'));

    io.on('connection', function (socket) {

        _replayCache(socket);

        socket.on('start', (info) => {
            _cache('start', info);
            socket.broadcast.emit('start', info);
        });

        socket.on('pending', () => {
            _cache('pending');
            socket.broadcast.emit('pending');
        });

        socket.on('pass', (test) => {
            _cache('pass', test);
            socket.broadcast.emit('pass', test);
        });

        socket.on('fail', (test) => {
            _cache('fail', test);
            socket.broadcast.emit('fail', test);
        });

        socket.on('end', () => {
            _cache('end');
            socket.broadcast.emit('end');
        });
    });

    http.listen(options.port, done);
}

function _replayCache(socket) {
    if (!cache) return;
    cache.forEach(function (event) {
        socket.emit(event.event, event.args)
    })
}

function _cache(event, args) {
    if (event == 'start') {
        cache = [];
    }
    cache.push({ event, args });
}