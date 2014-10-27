var Promise        = require('promise'),
    gulp           = require('gulp'),
    $              = require('gulp-load-plugins')(),
    mainUtil       = require('./main_util');

exports.imagesModules = function() {
  return new Promise(function (fulfil) {
    mainUtil.eachModule(function(module) {
      $.util.log('-' + module);
      gulp.src(['app/modules/' + module + '/images/*'])
        .pipe(gulp.dest('./builds/development/images/' + module))
        .pipe(gulp.dest('./builds/production/images/' + module));
    }, fulfil);
  });
};

exports.imagesShared = function() {
  return new Promise(function (fulfil) {
    $.util.log('-shared');
    gulp.src(['app/shared/images/*'])
      .pipe($.flatten())
      .pipe(gulp.dest('./builds/development/images/shared'))
      .pipe(gulp.dest('./builds/production/images/shared'))
      .on('end', fulfil);
  });
};