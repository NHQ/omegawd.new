var	events = require('./init.events.js')
;

module.exports = function(){	
	// init event mechanisms
	
	this.eve = new window.EventEmitter2({
	      wildcard: false, // should the event emitter use wildcards.
	      delimiter: '.', // the delimiter used to segment namespaces, defaults to `.`.
	      maxListeners: 20, // the max number of listeners that can be assigned to an event, defaults to 10.
	    });
	
	this.eve.on('error', this.errorHandler)
	
	this.eve.on('newListener', function(e){console.log(e)})

	this.eve.on('readyFS', this.writer.create) // <-- endpoint. **NOTICE**! If we had actual files and sets, we would index the metadb file and init the whole app. Currently: creates new writer
	
	this.fs = new WebFS();
	
	this.fs.setFileSystem(this.fs.PERSISTENT, 50, events.initFS)

};


















/* OLD

	function initFS(self){
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		var self = self;
		function successCallback(e){
			self.fs.init({persistent: true, size: 50 * 1024 * 1024}, events.initFS, function(e){console.log(e)});
		};
		window.requestFileSystem(PERSISTENT, 50 * 1024 *1024, successCallback, function(e){console.log(e)})
	};
	
	initFS(this)

*/
