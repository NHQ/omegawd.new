var	events = require('./init.events.js')
;

module.exports = function(){	
	// init event mechanisms
	
	this.eve = new window.EventEmitter2({
	      wildcard: true, // should the event emitter use wildcards.
	      delimiter: '.', // the delimiter used to segment namespaces, defaults to `.`.
	      maxListeners: 20, // the max number of listeners that can be assigned to an event, defaults to 10.
	    });
	
	this.eve.on('error', this.errorHandler)
	this.eve.on('newListener', function(e){console.log(e)})
	this.eve.on('readyFS', events.readyFS)
	
	this.fs = new Filer();
//	initFs(this)
	
	function intFS(self){
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		var self = self;
		function successCallback(e){
			self.fs.init({persistent: true, size: 50 * 1024 * 1024}, function(fs){
				self.eve.emit('readyFS', self)
			}, function(e){console.log(e)});
		};
		window.requestFileSystem(PERSISTENT, 50 * 1024 *1024, successCallback, function(e){console.log(e)})
	};intFS(this)

	this.writer()

  //    The following is needed. Filer.js doesn't seem to do persitant storage right
/*
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

 // var fs = self.fileSystem = new Filer();
  
  var errorHandler = function(err){
      console.log('error = ' + err.name)
  };

  window.requestFileSystem.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
   // fs.write()
  }, errorHandler)

//  fs.init({persistent: true, size: 15 * 1024 * 1024}, function(fs) {
    // stuff
//  }, fs.errorHandler);
 */
}
