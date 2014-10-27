var Promise        = require('promise'),
    gulp           = require('gulp'),
    $              = require('gulp-load-plugins')(),
    mainUtil       = require('./main_util');

exports.fontsModules = function() {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding app fonts');
    mainUtil.eachModule(function(module) {
      $.util.log('-' + module);
      gulp.src(['app/modules/' + module + '/fonts/*'])
        .pipe(gulp.dest('./builds/development/fonts/' + module))
        .pipe(gulp.dest('./builds/production/fonts/' + module));
    }, fulfil);
  });
};

exports.fontsShared = function() {
  return new Promise(function (fulfil) {
    $.util.log('-shared');
    gulp.src(['app/shared/fonts/*'])
      .pipe($.flatten())
      .pipe(gulp.dest('./builds/development/fonts/shared'))
      .pipe(gulp.dest('./builds/production/fonts/shared'))
      .on('end', fulfil);
  });
};