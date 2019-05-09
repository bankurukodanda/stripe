const gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload(),
    sass= require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps= require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    changed= require("gulp-changed"),
    uglify = require("gulp-uglify"),
    lineec = require("gulp-line-ending-corrector"),
    del = require('del');

const scss = './web-app/dist/css',
    js = './web-app/lib/',
    jsSRC=[js +'jquery.js',
           './web-app/stripe-header.js',
           './web-app/script.js']
    jsDist = './web-app/dist/js/',
    cssSRC = ['./web-app/lib/normalize.css', './web-app/lib/font-awesome.min.css','./web-app/style.css','./web-app/stripe-header.css'],
    styleWatchFiles  = '**/*.scss';

function javascript() {

    return gulp.src(jsSRC)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsDist));
}
    function concatCSS() {
    
    return gulp.src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pipe(gulp.dest(scss));
  }

  function clean() {
      return del(['./web-app/dist']);
  }
  
  function css() {
    return gulp.src(['./web-app/style.scss', './web-app/stripe-header.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest('./web-app'));
  }

  function watch(){
    gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
    gulp.watch(jsSRC, javascript);
  }
  function copy(){
    return gulp.src(['./web-app/sass/fonts/**'])
    .pipe(gulp.dest('./web-app/dist/fonts'));

  }
  exports.javascript = javascript;
  exports.clean = clean;
  exports.concatCSS = concatCSS;
  exports.css = css;
  exports.copy = copy;
  var build = gulp.parallel(watch);
  gulp.task('default', build);
//  gulp.task('default', build);
