var gulp = require('gulp');


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

var arr_styleLib = [
  './node_modules/bootstrap/dist/css/bootstrap.css'
];
var arr_jsLib = [
  './node_modules/jquery/dist/jquery.js',
  './node_modules/bootstrap/dist/js/bootstrap.js'
];

//{{{ TODO  全套  gulp excute
gulp.task('excute', function() {
  runSequence('less', 'minify_libStyle', 'minify_libJs', 'minify_style', 'minify_js');
});
//}}}

//{{{ TODO  壓縮檔案  gulp minify_libStyle, gulp minify_libJs, gulp minify_style, gulp minify_js
gulp.task('minify_libStyle', ['concat_libStyle'], function() {
  return gulp.src(['lib/' + css_path + 'lib.css']).pipe(minifyCSS({keepBreaks: true,})).pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".css";
  })).pipe(gulp.dest('lib/' + css_path));
});

gulp.task('minify_libJs', ['concat_libJs'], function() {
  return gulp.src(['lib/' + js_path + 'lib.js']).pipe(uglify()).pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".js";
  })).pipe(gulp.dest('lib/' + js_path));
});

gulp.task('minify_style', function() {
  return gulp.src(css_path + 'style.css').pipe(minifyCSS({keepBreaks: true,})).pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".css";
  })).pipe(gulp.dest(css_path));
});

gulp.task('minify_js', function() {
  return gulp.src(js_path + 'script.js').pipe(uglify()).pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".js";
  })).pipe(gulp.dest(js_path));
});
//}}}

//{{{ TODO  合併檔案  gulp concat_libStyle, gulp concat_libJs
gulp.task('concat_libStyle', function(){
  return gulp.src(arr_styleLib).pipe(concat('lib.css')).pipe(gulp.dest('lib/' + css_path));
});

gulp.task('concat_libJs', function(){
  return gulp.src(arr_jsLib).pipe(concat('lib.js')).pipe(gulp.dest('lib/' + js_path));
});
//}}}

//{{{ TODO  編譯less
gulp.task('less', function(){
  return gulp.src(css_path + '*.less').pipe(less({})).pipe(gulp.dest(css_path));
});
//}}}

//{{{ TODO  移動套件檔案  gulp export
gulp.task('export', ['clean_lib'], function(){
  setTimeout(function(){
    gulp.src(arr_styleLib).pipe(gulp.dest('lib/' + css_path));
    gulp.src(arr_jsLib).pipe(gulp.dest('lib/' + js_path));
  }, 500);
});
//}}}

//{{{ TODO  清除檔案  gulp clean_lib
gulp.task('clean_lib', function() { 
  return rimraf('lib/*', function(){});
});
//}}}

gulp.task('default', function(){
  console.log('Welcome to default gulp.');
});
