var gulp = require('gulp');

gulp.task('default', function(){
  console.log('Welcome to default gulp.');
});

var install = require('gulp-install');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var mainBowerFiles = require('main-bower-files');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var js_path = 'js/'; 
var css_path = 'css/';
var source_path = './node_modules/';

gulp.task('export', ['clean_lib', 'clean'], function(){
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ]).pipe(gulp.dest('lib/' + css_path));

  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js'
  ]).pipe(gulp.dest('lib/' + js_path));
});

//  TODO  清除
gulp.task('clean_lib', function() { 
  return rimraf('lib/*', function(){});
});

gulp.task('clean', function() { 
  rimraf(js_path + '*' , function(){});
  rimraf(css_path + '*' , function(){});
});
