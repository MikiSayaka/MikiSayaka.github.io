var gulp = require('gulp');
var install = require('gulp-install');
var gulpFilter = require('gulp-filter');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var mainBowerFiles = require('main-bower-files');


var js_dest_path = 'lib/js';
var css_dest_path = 'lib/css';
var img_dest_path = 'lib/img';
var font_path = 'lib/fonts';

var jsFilter = gulpFilter('*.js');
var cssFilter = gulpFilter(['*.css', '*.css.map']);
var imgFilter = gulpFilter(['*.gif', '*.png']);
var fontFilter = gulpFilter(['*.eot', '*.svg', '*.ttf', '*.woff*']);

gulp.task('build', function(){
  runSequence('clean', 'install', 'export');
});

gulp.task('default', function(){
  console.log('Hellp gulp');
  console.log('Let\'s get more money!');
  //  console.log(mainBowerFiles());
});

gulp.task('clean', function() { 
    rimraf('lib', function(){});
    return rimraf('bower_components', function(){});
});


gulp.task('install', function(){
  gulp.src(['./bower.json', './package.json']).pipe(install());
});

gulp.task('export', function(){
  /*
  return gulp.src(mainBowerFiles())
    .pipe(jsFilter).pipe(gulp.dest(js_dest_path)).pipe(jsFilter.restore())
    .pipe(cssFilter).pipe(gulp.dest(css_dest_path)).pipe(cssFilter.restore())
    .pipe(imgFilter).pipe(gulp.dest(img_dest_path)).pipe(imgFilter.restore())
    .pipe(fontFilter).pipe(gulp.dest(font_path))
  */
  gulp.src(mainBowerFiles()).pipe(jsFilter).pipe(gulp.dest(js_dest_path));
  gulp.src(mainBowerFiles()).pipe(cssFilter).pipe(gulp.dest(css_dest_path));
  gulp.src(mainBowerFiles()).pipe(imgFilter).pipe(gulp.dest(img_dest_path));
  gulp.src(mainBowerFiles()).pipe(fontFilter).pipe(gulp.dest(font_path));
});
