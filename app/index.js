'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var GulpularGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  },

  promptTask: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.src.copy('package.json', 'package.json');
      this.src.copy('bower.json', 'bower.json');
      this.src.copy('gulpfile.js', 'gulpfile.js');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
      this.directory('app', 'app');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = GulpularGenerator;
