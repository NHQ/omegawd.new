var events = require('./lib/events.js')
,		writer = require('./lib/writer.js')
,		init = require('./lib/init.js')
;

module.exports = app;

function app(window) {
		window = window;
		var self = this
	  ,   winX = window.innerWidth
	  ,   winY = window.innerHeight
	  ;
		
		this.errorHandler = function(e){
				console.log('errrrr', e)
				
			  var msg = '';
				
			  switch (e.code) {
			    case FileError.QUOTA_EXCEEDED_ERR:
			      msg = 'QUOTA_EXCEEDED_ERR';
			      break;
			    case FileError.NOT_FOUND_ERR:
			      msg = 'NOT_FOUND_ERR';
			      break;
			    case FileError.SECURITY_ERR:
			      msg = 'SECURITY_ERR';
			      break;
			    case FileError.INVALID_MODIFICATION_ERR:
			      msg = 'INVALID_MODIFICATION_ERR';
			      break;
			    case FileError.INVALID_STATE_ERR:
			      msg = 'INVALID_STATE_ERR';
			      break;
			    default:
			      msg = 'Unknown Error';
			      break;
			  };
		}
		

	  this.user = {};
		this.events = events;
		this.writer = writer;
		this.init = init;
//		this.events = require('./lib/events.js');
//		this.init = require('./lib/init')
//		this.writer();
		window.OMG = this;
		return this
};
