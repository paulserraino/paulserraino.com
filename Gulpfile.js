'use strict';

var gulp = require('gulp');
var smaps = require('gulp-sourcemaps');

gulp.task('default', ['build', 'bundle']);

gulp.task('build', function() {
    var babel = require('gulp-babel');

    return gulp.src('assets/js/lib/**/*.js')
        .pipe(smaps.init())
        .pipe(babel())
        .pipe(smaps.write('.', {sourceRoot: '/source/src'}))
        .pipe(gulp.dest('assets/js/dist'));
});

gulp.task('bundle', ['build'], function() {
    console.log('hi');
    return;
});
