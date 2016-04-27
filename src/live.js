var io = require('socket.io-client');

module.exports = Live;

function Live(ready, options) {
    options = options || {};

    options.url = options.url || 'ws://localhost:3000';

    var socket = io(options.url);

    socket.on('connect', function () {
        ready();
    });

    return function (runner) {

        runner.on('start', () => {
            socket.emit('start');
        });

        runner.on('pending', () => {
            socket.emit('pending');
        });

        runner.on('pass', (test) => {
            socket.emit(
                'pass',
                _getTest(test)
            );
        });

        runner.on('fail', (test) => {
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
        'state': test.state
    };
}

function _getPath(suite) {
    if (suite.parent) {
        return _getPath(suite.parent).concat([suite.title])
    }
    return [];
}

