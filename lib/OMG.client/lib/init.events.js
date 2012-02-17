exports.readyFS = function(self){
	
	checkUpLoad()
	
	function checkUpLoad(){
		//self.fs.
	}
	
//	self.fs.ls('/', function(x){console.log(x)}, function(e){console.log(e)})

		try{
				self.fs.open('/test.txs', function(file){
					console.log(x)
				}, function(e){console.log(e)})	
			}
		catch (err){
			console.log(err)
			}
};
