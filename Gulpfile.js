'use strict';

var gulp = require('gulp');
var Bundler = require('gtask-browserify');

gulp.task('default', ['bundle']);

gulp.task('watch', ['default'], function () {
    return gulp.watch('./assets/js/**/*.js', ['bundle']);
});

gulp.task('bundle', function () {
    var bundler = Bundler({
        entries: ['./assets/js/main.js'],
        dest: './assets/js/dist',
        transform: ["babelify"]
    });

    return bundler.bundle();
});
