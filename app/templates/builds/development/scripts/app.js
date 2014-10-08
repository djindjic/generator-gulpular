 /* exported ApplicationConfiguration */
 /* global ApplicationConfiguration:true */

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	'use strict';
	
	// Init module configuration options
	var applicationModuleName = 'Gulpular';
	var applicationModuleVendorDependencies = ['ngRoute'];

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
(function() {
	'use strict';

	//Start by defining the main module and adding the module dependencies
	angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

	// Setting HTML5 Location Mode
	angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	  function($locationProvider) {
	  	$locationProvider.html5Mode(true).hashPrefix('!');
	  }
	]);

	//Then define the init function for starting up the application
	angular.element(document).ready(function() {
	  //Fixing facebook bug with redirect
	  if (window.location.hash === '#_=_') window.location.hash = '#!';

	  //Then init the app
	  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
	});
})();
ApplicationConfiguration.registerModule('core');
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
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('AboutCtrl', [AboutCtrl]);

	function AboutCtrl() {
		var vm = this;

	  	vm.a = 'about';
	}
})();
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('ContactCtrl', [ContactCtrl]);

	function ContactCtrl() {
		var vm = this;

	  	vm.a = 'contact';
	 }
})();
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('MainCtrl', MainCtrl);

	function MainCtrl() {

	}
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsIm1vZHVsZXMvY29yZS9jb3JlLm1vZHVsZS5qcyIsIm1vZHVsZXMvY29yZS9jb25maWcvY29yZS5jb25maWcucm91dGVzLmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2Fib3V0LmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2NvbnRhY3QuanMiLCJtb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKiBleHBvcnRlZCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24gKi9cbiAvKiBnbG9iYWwgQXBwbGljYXRpb25Db25maWd1cmF0aW9uOnRydWUgKi9cblxuLy8gSW5pdCB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvblxudmFyIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbiA9IChmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0Ly8gSW5pdCBtb2R1bGUgY29uZmlndXJhdGlvbiBvcHRpb25zXG5cdHZhciBhcHBsaWNhdGlvbk1vZHVsZU5hbWUgPSAnR3VscHVsYXInO1xuXHR2YXIgYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMgPSBbJ25nUm91dGUnXTtcblxuXHQvLyBBZGQgYSBuZXcgdmVydGljYWwgbW9kdWxlXG5cdHZhciByZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uKG1vZHVsZU5hbWUsIGRlcGVuZGVuY2llcykge1xuXHRcdC8vIENyZWF0ZSBhbmd1bGFyIG1vZHVsZVxuXHRcdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIGRlcGVuZGVuY2llcyB8fCBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyk7XG5cblx0XHQvLyBBZGQgdGhlIG1vZHVsZSB0byB0aGUgQW5ndWxhckpTIGNvbmZpZ3VyYXRpb24gZmlsZVxuXHRcdGFuZ3VsYXIubW9kdWxlKGFwcGxpY2F0aW9uTW9kdWxlTmFtZSkucmVxdWlyZXMucHVzaChtb2R1bGVOYW1lKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGFwcGxpY2F0aW9uTW9kdWxlTmFtZTogYXBwbGljYXRpb25Nb2R1bGVOYW1lLFxuXHRcdGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzOiBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyxcblx0XHRyZWdpc3Rlck1vZHVsZTogcmVnaXN0ZXJNb2R1bGVcblx0fTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9TdGFydCBieSBkZWZpbmluZyB0aGUgbWFpbiBtb2R1bGUgYW5kIGFkZGluZyB0aGUgbW9kdWxlIGRlcGVuZGVuY2llc1xuXHRhbmd1bGFyLm1vZHVsZShBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lLCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXMpO1xuXG5cdC8vIFNldHRpbmcgSFRNTDUgTG9jYXRpb24gTW9kZVxuXHRhbmd1bGFyLm1vZHVsZShBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5jb25maWcoWyckbG9jYXRpb25Qcm92aWRlcicsXG5cdCAgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcblx0ICBcdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKS5oYXNoUHJlZml4KCchJyk7XG5cdCAgfVxuXHRdKTtcblxuXHQvL1RoZW4gZGVmaW5lIHRoZSBpbml0IGZ1bmN0aW9uIGZvciBzdGFydGluZyB1cCB0aGUgYXBwbGljYXRpb25cblx0YW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0ICAvL0ZpeGluZyBmYWNlYm9vayBidWcgd2l0aCByZWRpcmVjdFxuXHQgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJyNfPV8nKSB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjISc7XG5cblx0ICAvL1RoZW4gaW5pdCB0aGUgYXBwXG5cdCAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFtBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lXSk7XG5cdH0pO1xufSkoKTsiLCJBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2NvcmUnKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnY29yZScpLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdtYWluLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hYm91dCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBYm91dEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRhY3QuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgICByZWRpcmVjdFRvOiAnLydcbiAgICAgICAgfSk7XG4gICAgfVxuICBdKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHQgIC5tb2R1bGUoJ2NvcmUnKVxuXHQgIC5jb250cm9sbGVyKCdBYm91dEN0cmwnLCBbQWJvdXRDdHJsXSk7XG5cblx0ZnVuY3Rpb24gQWJvdXRDdHJsKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0ICBcdHZtLmEgPSAnYWJvdXQnO1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0ICAubW9kdWxlKCdjb3JlJylcblx0ICAuY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBbQ29udGFjdEN0cmxdKTtcblxuXHRmdW5jdGlvbiBDb250YWN0Q3RybCgpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdCAgXHR2bS5hID0gJ2NvbnRhY3QnO1xuXHQgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdCAgLm1vZHVsZSgnY29yZScpXG5cdCAgLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgTWFpbkN0cmwpO1xuXG5cdGZ1bmN0aW9uIE1haW5DdHJsKCkge1xuXG5cdH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9