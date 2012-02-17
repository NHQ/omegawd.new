module.exports = function(self){
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	var self = self;
	function successCallback(e){
		self.fs.init({persistent: true, size: 50 * 1024 * 1024}, function(fs){
			self.eve.emit('readyFS', 'honk')
		});
	};
	window.requestFileSystem(PERSISTENT, 50 * 1024 *1024, successCallback, self.errorHandler)
}