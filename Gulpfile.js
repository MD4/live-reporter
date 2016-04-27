const gulp = require('gulp');
const mocha = require('gulp-mocha');

const liveBuilder = require('./src/live');

var live = null;

gulp.task('connect-live', (done) => {
    live = liveBuilder(done, { url: 'http://localhost:3000' });
});

gulp.task('test', () => {
    return gulp.src(
        'test/**/*.js',
        { read: false }
    ).pipe(mocha({ reporter: live }));
});

gulp.task('default', [ 'connect-live', 'test' ], function () {
    return gulp
        .watch([ 'test/**/*.js', 'src/**/*.js' ], [ 'test' ])
        .on('error', function() {});
});