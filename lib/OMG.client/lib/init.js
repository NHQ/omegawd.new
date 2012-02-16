module.exports = function(){

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
