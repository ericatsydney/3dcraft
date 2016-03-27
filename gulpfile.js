// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(gulp.dest('./public/css'));
});