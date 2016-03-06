
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var babelify = require('babelify');

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './main.js',
        debug: true
    }).transform(babelify, {presets: ['es2015', 'react']});;

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify().on('error', gutil.log))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});
gulp.task('default', ['browserify']);