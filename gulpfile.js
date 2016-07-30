// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    changed = require('gulp-changed'),
    es2015Preset = require('babel-preset-es2015'),
    reactPreset = require('babel-preset-react'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    browserify = require('browserify');
var watchify = require('watchify');

gulp.task('sass', function () {
  return gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
  var customOptions = {
    entries: ['./resources/assets/js/all.js']
  }
  var bundler = watchify(browserify(customOptions));

  bundler.transform(babelify, {
    'presets': [es2015Preset, reactPreset]
  });

  return bundler.bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./public/js/min'));
});
