/* exported ApplicationConfiguration */
/* global ApplicationConfiguration:true */

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  'use strict';
  
  // Init module configuration options
  var applicationModuleName = 'Gulpular';
  var applicationModuleVendorDependencies = ['ngRoute', 'ionic'];

  // Add a new vertical module
  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || applicationModuleVendorDependencies);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();