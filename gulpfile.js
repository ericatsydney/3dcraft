'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var changed = require('gulp-changed');
var es2015Preset = require('babel-preset-es2015');
var reactPreset = require('babel-preset-react');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var rename = require("gulp-rename");

var libs = [
  'react',
  'react-three-renderer',
  'react-dom',
  'three'
];

gulp.task('sass', function () {
  return gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(gulp.dest('./public/css'));
});

// Build vendor's js.
gulp.task('vendor', function() {
  // A dummy entry point for browserify
  var stream = browserify({
      debug: false,  // Don't provide source maps for vendor libs
    });

  stream.require('react')
    .require('react-dom')
    .require('three')
    .require('react-three-renderer');

  stream.transform(babelify, {
    'presets': [es2015Preset, reactPreset]
  });

  return stream.bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('./public/js/min'));
});

gulp.task('js', function () {
  var customOptions = {
    entries: ['./resources/assets/js/all.js'],
    fast: true,
    bundleExternal: false
  }
  var bundler = watchify(browserify(customOptions));

  bundler.transform(babelify, {
    'presets': [es2015Preset, reactPreset]
  });

  return bundler.bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./public/js/min'));
});
