var fs             = require('fs'),
    mainBowerFiles = require('main-bower-files')

exports.eachModule = function(closure, cb) {
  var rootDir = './app/modules';
  var dirs, file, filePath, files, stat, _i, _len;
  files = fs.readdirSync(rootDir);
  dirs = [];
  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    if (file[0] !== '.') {
      filePath = "" + rootDir + "/" + file;
      stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        dirs.push(file);
      }
    }
  }
  for(var moduleIndex = 0; moduleIndex <= dirs.length; moduleIndex++) {
    if(moduleIndex === dirs.length) {
      cb();
    } else {
      closure(dirs[moduleIndex]);
    }
  }
};

exports.bowerFiles = {
  scripts: function() {
    var fileRegEx = (/.*\.js$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  },
  styles: function() {
    var fileRegEx = (/.*\.css$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  },
  fonts: function() {
    var fileRegEx = (/.*\.(?:eot|woff|ttf|svg)$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  },
  images: function() {
    var fileRegEx = (/.*\.(?:jpg|png|gif)$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  }
};