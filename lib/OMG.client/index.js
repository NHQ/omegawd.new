var events = require('./lib/events.js')
,		writer = require('./lib/writer')
,		init = require('./lib/init')
;

module.exports = app;
function app() {
//		var window = window;
		var self = this
	  ,   winX = window.innerWidth
	  ,   winY = window.innerHeight
	  ;
			
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

