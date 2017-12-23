/*====================================
=            Requirements            =
====================================*/

var gulp = require('gulp');
/* Requires the gulp-sass plugin */
var sass = require('gulp-sass');
/* Autoprefixer */
var autoprefixer = require("gulp-autoprefixer")
/* Concatenation of CSS and JS files */
/*               Usage               */
/*                                   */
/*  <!--build:js js/main.min.js -->  */
/*  Your HTML header script links    */
/*  <!-- endbuild -->                */
/*                                   */
/*************************************/
var useref = require('gulp-useref');
/* Concatenation of JS */
var concat = require('gulp-concat');
/* Minification of JS */
var uglify = require('gulp-uglify');
/* Minification of CSS */
var cssnano = require('gulp-cssnano');
/* If statements in gulpfile */
var gulpIf = require('gulp-if');
/* Finds changes in files and lets new ones only in pipe */
var changed = require('gulp-changed');
/* Image optimization */
var imagemin = require('gulp-imagemin');
var tinypng = require('gulp-tinypng-compress');
/* Deleting */
var del = require('del');
/* Order of task execution */
var runSequence = require('run-sequence');
/* Resizing and formatting images */
var responsive = require('gulp-responsive');

/*===========================================
=         Root Folder Files Transfer        =
===========================================*/

gulp.task('files', function(){
  // Gets all files that should be in root folder of the website (like robots.txt, .htaccess, favicon.ico...)
  return gulp.src(['src/root-files/**/*', 'src/root-files/**/.*']) 
    .pipe(gulp.dest('static'))
});

/*====================================
=            Script Tasks            =
====================================*/

gulp.task('scripts', function(){
  return gulp.src(['src/js/vendors/*.js', 'src/js/*.js'])
  //return gulp.src('src/js/**/*.js') // Gets all files ending with .js in app/scss and children dirs
    .pipe(concat('scripts.js'))
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Transfers to destination
    .pipe(gulp.dest('static/js'))
});

/*==================================
=            SCSS Tasks            =
==================================*/

gulp.task('sass', function(){
  return gulp.src('src/scss/main.scss')
  //return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('static/css'))
});

/*==================================
=            HTML Tasks            =
==================================*/


/*============================================================
=            Concatenation and Minification Tasks            =
============================================================*/


/*================================================
=            Image optimization Tasks            =
================================================*/

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Looking for changes in images
    .pipe(changed('static/images'))
    .pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			 ]
		  })
	  ]))
    //Output if svg
    .pipe(gulpIf('*.svg', gulp.dest('static/images')))

    // Tinypng optimization and compression  
  	.pipe(gulpIf('!*.svg', tinypng({
          key: 'v6ft3Ku0krnsw7-3pbT072L5azDyrD3t',
          //sigFile: 'src/images/.tinypng-sigs',
          //log: true
      })))

    //Resizing and grayscale
    .pipe(gulpIf('!*.svg', responsive({
      '*.+(png|jpg|jpeg)': [{
        width: 400,
        grayscale: true,
        rename: {
          suffix: '-sm',
          extname: '.jpg',
        },
      }, {
        width: 800,
        grayscale: true,
        rename: {
          suffix: '-md',
          extname: '.jpg',
        },
      }, {
        width: 1200,
        grayscale: true,
        rename: {
          suffix: '-lg',
          extname: '.jpg',
        }, 
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }, {
        width: 1800,
        grayscale: true,
        rename: {
          suffix: '-xl',
          extname: '.jpg',
        }, 
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    })))    

    .pipe(gulp.dest('static/images'))
});

/*===================================
=            Fonts Tasks            =
===================================*/

gulp.task('fonts', function(){
  // Gets all fonts and transfers them to static folder
  return gulp.src('src/fonts/**/*')
    // Look for changes 
    .pipe(changed('static/fonts'))
    .pipe(gulp.dest('static/fonts'))
});

/*==============================================
=            Deleting Static Folder            =
==============================================*/

gulp.task('clean:static', function() {
  return del.sync(['static/css', 'static/js', 'static/*', 'static/.*']);
})

/*===================================
=            Watch Tasks            =
===================================*/

gulp.task('watch', ['scripts', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  gulp.watch('src/js/**/*.js', ['scripts']); 
  // Other watchers
});

/*=========================================
=            Public Build Task            =
=========================================*/

gulp.task('build', function (callback) {
  runSequence('clean:static', 
    ['sass', 'scripts', 'files', 'fonts' ,'images'],
    callback
  )
});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function (callback) {
  runSequence(['sass', 'scripts', 'watch'],
    callback
  )
});







