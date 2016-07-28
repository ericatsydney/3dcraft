// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    es2015Preset = require('babel-preset-es2015'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    browserify = require('browserify');

gulp.task('sass', function () {
  return gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
  var bundler = browserify('./resources/assets/js/all.js');

  bundler.transform(babelify, {
      'presets': [es2015Preset]
    });

  return bundler.bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./public/js/min'));
});
