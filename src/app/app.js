var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./src/app/public'));

io.on('connection', function (socket) {

    socket.on('start', () => {
        socket.broadcast.emit('start');
    });

    socket.on('pending', () => {
        socket.broadcast.emit('pending');
    });

    socket.on('pass', (test) => {
        socket.broadcast.emit('pass', test);
    });

    socket.on('fail', (test) => {
        socket.broadcast.emit('fail', test);
    });

    socket.on('end', () => {
        socket.broadcast.emit('end');
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

