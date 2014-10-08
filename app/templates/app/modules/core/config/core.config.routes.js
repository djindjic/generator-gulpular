(function() {
  'use strict';

  angular.module('core').config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'about.html',
          controller: 'AboutCtrl'
        })
        .when('/contact', {
          templateUrl: 'contact.html',
          controller: 'ContactCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
})();