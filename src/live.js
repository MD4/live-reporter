module.exports = Live;

function Live(options) {
    options = options || {};

    options.url = options.url || 'ws://127.0.0.1:3000';

    return function Live(runner) {

        runner.on('start', function () {
            console.log('start', host);
        });

        runner.on('pending', function () {
            console.log('start', arguments);
        });

        runner.on('pass', function (test) {
            console.log('pass', arguments);
        });

        runner.on('fail', function () {
            console.log('fail', arguments);
        });

        runner.on('end', function () {
            console.log('end', arguments);
        });
    };
}


