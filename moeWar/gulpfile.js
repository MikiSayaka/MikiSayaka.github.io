var gulp = require('gulp');
var rimraf = require('rimraf');
var install = require('gulp-install');
var gulpFilter = require('gulp-filter');
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

var js_dest_path = 'lib/js';
var css_dest_path = 'lib/style';
var img_dest_path = 'lib/img';
var font_path = 'lib/font';

var jsFilter = gulpFilter('*.js');
var cssFilter = gulpFilter(['*.css', '*.css.map']);
var imgFilter = gulpFilter(['*.gif', '*.png']);
var fontFilter = gulpFilter(['*.eot', '*.svg', '*.ttf', '*.woff*']);

gulp.task('build', function(callback){
  console.log('Build start!');
  runSequence('clean', 'install','exportBowerFile', callback);
  console.log('Build finish!');
});

gulp.task('clean', function() {	
  rimraf("lib/", function(){});
  return rimraf("bower_components", function(){});
});

gulp.task('install', function() {
    return gulp.src(['./bower.json', './package.json']).pipe(install());
});
gulp.task('install', function() {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});
gulp.task('exportBowerFile', function(){
  return gulp.src(mainBowerFiles())
    .pipe(jsFilter).pipe(gulp.dest(js_dest_path)).pipe(jsFilter.restore())
    .pipe(cssFilter).pipe(gulp.dest(css_dest_path)).pipe(cssFilter.restore())
    .pipe(imgFilter).pipe(gulp.dest(img_dest_path)).pipe(imgFilter.restore())
    .pipe(fontFilter).pipe(gulp.dest(font_path))
});
