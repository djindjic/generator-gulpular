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