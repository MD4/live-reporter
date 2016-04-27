var io = require('socket.io-client');
var app = require('./app/app');

module.exports = Live;

function Live(ready, options) {
    options = options || {};
    options.host = options.host || 'localhost';
    options.port = options.port || 3000;

    var socket = io('ws://' + options.host + ':' + options.port);

    app.start(options, function () {
        console.log('Live reporter UI available at localhost:%s', options.port);
        socket.on('connect', function () {
            ready();
        });
    });

    return function (runner) {
        runner.on('start', () => {
            console.log(arguments);
            socket.emit('start', {total: runner.total});
        });

        runner.on('pending', () => {
            console.log(arguments);
            socket.emit('pending');
        });

        runner.on('pass', (test) => {
            socket.emit(
                'pass',
                _getTest(test)
            );
        });

        runner.on('fail', (test, err) => {
            test.err = err;
            socket.emit(
                'fail',
                _getTest(test)
            );
        });

        runner.on('end', () => {
            socket.emit('end');
        });
    };
}

function _getTest(test) {
    return {
        'title': test.title,
        'type': test.type,
        'body': test.body,
        'file': test.file,
        'path': _getPath(test.parent),
        'duration': test.duration,
        'state': test.state,
        'err': test.err
    };
}

function _getPath(suite) {
    if (suite.parent) {
        return _getPath(suite.parent).concat([ suite.title ])
    }
    return [];
}

