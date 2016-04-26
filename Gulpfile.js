const gulp = require('gulp');
const mocha = require('gulp-mocha');
const liveBuilder = require('./src/live');
var live = null;

gulp.task('connect-live', (done) => {
    live = liveBuilder(done);
});

gulp.task('default', ['connect-live'], () => {
    return gulp.src(
        'test/**/*.js',
        { read: false }
    ).pipe(mocha({ reporter: live }));
});