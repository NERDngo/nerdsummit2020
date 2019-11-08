// Gulpfile adapted from https://goede.site/setting-up-gulp-4-for-automatic-sass-compilation-and-css-injection

var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var sourcemaps = require("gulp-sourcemaps");

function style() {
  return (
    gulp.src("sass/**/*.scss")
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)

      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))

      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("css-new"))
  );
}

function watch() {
  gulp.watch("sass/**/*.scss", style);
}

exports.watch = watch;
