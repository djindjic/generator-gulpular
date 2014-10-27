var Promise        = require('promise'),
    gulp           = require('gulp'),
    del            = require('del'),
    stylish        = require('jshint-stylish'),
    $              = require('gulp-load-plugins')(),
    cachebust      = new $.cachebust;

var mainUtil      = require('./gulp/main_util'),
    appImagesUtil = require('./gulp/app_images_util'),
    appFontsUtil  = require('./gulp/app_fonts_util'),
    vendorUtil    = require('./gulp/vendor_util');

var vendor = function() {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding vendor and bower assets');
    vendorUtil.vendorScripts(cachebust)
    .then(vendorUtil.vendorStyles(cachebust))
    .then(vendorUtil.vendorImages)
    .then(vendorUtil.vendorFonts)
    .then(fulfil);
  });
};

var scripts = function() {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding app scripts');
    gulp.src(['app/config.js', 'app/app.js', 'app/**/*module.js', 'app/**/config/*.js', 'app/**/*.js', '!app/vendor/**/*'])
      .pipe($.jshint())
      .pipe($.jshint.reporter(stylish))
      .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
      .pipe($.sourcemaps.write())
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./builds/development/scripts'))
      .pipe($.uglify())
      .pipe(gulp.dest('./builds/production/scripts'))
      .on('end', fulfil);
    });
};

var styles = function() {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding app styles');
    gulp.src(['app/**/styles/*.css', '!app/vendor/**/*'])
      .pipe($.concat('app.css'))
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./builds/development/styles'))
      .pipe($.minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(gulp.dest('./builds/production/styles'))
      .on('end', fulfil);
    });
};

var images = function() {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding app images');
    appImagesUtil.imagesModules()
    .then(appImagesUtil.imagesShared)
    .then(fulfil);
  });
};

var fonts = function() {
  return new Promise(function (fulfil) {
    appFontsUtil.fontsModules()
    .then(appFontsUtil.fontsShared)
    .then(fulfil);
  });
};

var templates = function () {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding app templates');
    mainUtil.eachModule(function(module) {
      $.util.log('-' + module);
      gulp.src('app/modules/' + module + '/templates/*.html')
        .pipe($.htmlmin({
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyJS: true,
          minifyCSS: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeComments: true
        }))
        .pipe($.angularTemplatecache({
          module: module,
          base: function(file) {
              var splitPath = file.relative.split('/');
              return splitPath[splitPath.length - 1];
          }
        }))
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./builds/development/scripts'))
        .pipe($.uglify())
        .pipe(gulp.dest('./builds/production/scripts'));
    }, fulfil);
  });
};

var clean = function (paths) {
  return new Promise(function (fulfil) {
    $.util.log('Clear:');
    paths.forEach(function(path) {
      $.util.log('-' + path);
    });
    del(paths, fulfil);
  });
};

var indexHtml = function () {
  return new Promise(function (fulfil) {
    $.util.log('Rebuilding index.html');
    gulp.src('./app/index.html')
      .pipe(cachebust.references())
      .pipe(gulp.dest('./builds/development'))
      .pipe($.htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./builds/production'))
      .on('end', fulfil);
    });
};

var createCordovaBuildFiles = function () {
  return new Promise(function (fulfil) {
    $.util.log('Creating cordova build files');
    gulp.src('./builds/production/**/*')
      .pipe(cachebust.references())
      .pipe(gulp.dest('./www'))
      .on('end', fulfil);
    });
};

var startServer = function(){
  return new Promise(function (fulfil) {
    gulp.src('./builds/development')
      .pipe($.webserver({
        port: 9000,
        livereload: true,
        fallback: 'index.html',
         proxies: [
          {
            source: '/api', target: 'http://localhost:3000/'
          }
        ]
      }))
      .on('end', fulfil);
    });
};

var watchFiles = function() {
  $.util.log('Watching files');
  $.watch(['app/index.html'], function() {
    clean(['builds/**/index.html'])
    .then(indexHtml)
    .then(createCordovaBuildFiles);
  });
  $.watch('app/modules/**/templates/*.html', function() {
    clean(['builds/**/scripts/templates*.js'])
    .then(templates)
    .then(indexHtml)
    .then(createCordovaBuildFiles);
  });
  $.watch(['app/**/*.js', '!app/vendor/**/*.js'], function() {
    clean(['builds/**/scripts/app*.js'])
    .then(scripts)
    .then(indexHtml)
    .then(createCordovaBuildFiles);
  });
  $.watch(['app/**/*.css', '!app/vendor/**/*.css'], function() {
    clean(['builds/**/styles/app*.css'])
    .then(styles)
    .then(indexHtml)
    .then(createCordovaBuildFiles);
  });
  $.watch(['app/**/fonts/*', '!app/vendor/**/*'], function() {
    clean(['builds/**/fonts/**/*'])
    .then(fonts)
    .then(createCordovaBuildFiles);
  });
  $.watch(['./bower.json', 'app/vendor/**/*'], function() {
    clean([
      'builds/**/scripts/lib*.js',
      'builds/**/styles/lib*.css',
      'builds/**/fonts/*',
      'builds/**/images/*'
    ])
    .then(vendor)
    .then(indexHtml)
    .then(createCordovaBuildFiles);
  });
};

gulp.task('default',
  function() {
    clean(['builds', 'www'])
    .then(scripts)
    .then(templates)
    .then(styles)
    .then(images)
    .then(fonts)
    .then(vendor)
    .then(indexHtml)
    .then(createCordovaBuildFiles)
    .then(startServer)
    .then(watchFiles);
  }
);