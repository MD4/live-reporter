const gulp = require('gulp');
const mocha = require('gulp-mocha');
const live = require('./src/live');

gulp.task('default', () => {
    return gulp.src(
        'test/**/*.js',
        { read: false }
    ).pipe(mocha({ reporter: live('127.0.0.1:8080') }));
});