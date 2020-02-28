var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css');
    sourcemaps = require('gulp-sourcemaps');
    minifyJS 	= require("gulp-uglify");


var coffeeSources = ['scripts/hello.coffee'],
    // jsSources = ['js/*.js'],
    sassSources = ['sass/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';


gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({outputStyle: 'compressed'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('css'))
  .pipe(connect.reload())
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true})
    .on('error', gutil.log))
  .pipe(gulp.dest('scripts'))
});

// task
     
gulp.task('minify-css', function() {
  return gulp.src('./css/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

// gulp.task('js', function() {
//   gulp.src(jsSources)
//   .pipe(uglify())
//   .pipe(concat('script.js'))
//   .pipe(gulp.dest(outputDir))
//   .pipe(connect.reload())
// });

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
//   gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'coffee', 'js', 'sass', 'connect', 'watch']);