// NOTE: this is for checking the file system for previous use, the metadb.json, 


exports.initFS = function(fs){
	
	omg.fs.readdir('', checkUpLoad)
	
	function checkUpLoad(err, res){

		function truthTest(e){
			console.log(e)
			return e === '/metadb.json'
		
		};
		
		if (_.any(res, truthTest)){
			
			omg.fs.readFile('/metadb.json', 'utf8', exports.readyDB);
		
		}
		
		else {
			
			var metadb = {
				created: new Date().getTime(),
				owner: omg.user.name,
				files: [],
				sets: [],
				lastUpdate: new Date().getTime()

			};
			
			omg.fs.mkdir('/temp', undefined, null);
			
			omg.fs.writeFile('/metadb.json', JSON.stringify(metadb), 'utf8', exports.readyDB);

		}

	};

};

exports.readyDB = function(error, read, buffer){	

	var reader = new FileReader();

	reader.onload = function(db){
		
		omg.metaDbLocal = JSON.parse(db.target.result);

		omg.eve.emit('readyFS') // < --- endpoint

	};

	reader.onerror = omg.errorHandler;
	
	reader.readAsText(buffer || read);

};

