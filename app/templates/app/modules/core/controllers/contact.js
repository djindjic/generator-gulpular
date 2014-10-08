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