var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  runSequence = require('run-sequence'),
  del = require('del'),
  inlinesource = require('gulp-inline-source'),
  base64 = require('gulp-base64'),
  browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('clean-dist', function() {
  return del.sync('dist');
});

gulp.task('clean-build', function() {
  return del.sync('dist/assets/**');
});

gulp.task('build-css', function () {
  return gulp.src('dev/assets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano({
      zindex: false
    }))
    .pipe(base64({
      debug: true
    }))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('build-js', function() {
  return gulp.src('dev/assets/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('build-html', function() {
  return gulp.src('dev/*.html')
    .pipe(inlinesource({
      compress: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
  runSequence('clean-dist', 'build-css', 'build-js', 'build-html', 'clean-build',
    callback
  );
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('dev/**/*', function() {
    runSequence('build-css', 'build-js', 'build-html', browserSync.reload);
  });
});