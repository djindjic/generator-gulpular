var Promise        = require('promise'),
    gulp           = require('gulp'),
    $              = require('gulp-load-plugins')(),
    glob           = require('glob'),
    mainUtil       = require('./main_util');

exports.vendorScripts = function(cachebust) {
  return new Promise(function (fulfil) {
    $.util.log('-scripts');
    gulp.src(['app/vendor/**/*.js'].concat(mainUtil.bowerFiles.scripts()))
      .pipe($.concat('lib.js'))
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./builds/development/scripts'))
      .pipe($.uglify())
      .pipe(gulp.dest('./builds/production/scripts'))
      .on('end', fulfil);
  });
};
exports.vendorJspm = function() {
  return new Promise(function (fulfil) {
    $.util.log('-jspm');
    gulp.src('app/jspm_packages/**/*')
      .pipe(gulp.dest('./builds/development/jspm_packages'))
      .pipe(gulp.dest('./builds/production/jspm_packages'))
      .on('end', fulfil);
  });
};

exports.vendorStyles = function(cachebust) {
  return new Promise(function (fulfil) {
    $.util.log('-styles');
    gulp.src(['app/vendor/**/styles/*'].concat(mainUtil.bowerFiles.styles()))
      .pipe($.concat('lib.css'))
      // TODO cachebust doesnt work with uncss
      // .pipe($.uncss({
      //   html: glob.sync('app/**/*.html')
      // }))
      .pipe($.minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./builds/development/styles'))
      .pipe(gulp.dest('./builds/production/styles'))
      .on('end', fulfil);
  });
};

exports.vendorFonts = function() {
  return new Promise(function (fulfil) {
    $.util.log('-fonts');
    gulp.src(['app/vendor/**/fonts/**/*'].concat(mainUtil.bowerFiles.fonts()))
      .pipe($.flatten())
      .pipe(gulp.dest('./builds/development/fonts'))
      .pipe(gulp.dest('./builds/production/fonts'))
      .on('end', fulfil);
  });
};

exports.vendorImages = function() {
  return new Promise(function (fulfil) {
    $.util.log('-images');
    gulp.src(['app/vendor/**/images/**/*'].concat(mainUtil.bowerFiles.images()))
      .pipe($.flatten())
      .pipe(gulp.dest('./builds/development/images'))
      .pipe(gulp.dest('./builds/production/images'))
      .on('end', fulfil);
  });
};