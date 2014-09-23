var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task('browserify-portfolio', function () {
	return browserify('./js/portfolio.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./js/build/portfolio/'));
});

gulp.task('default', ['browserify-portfolio']);