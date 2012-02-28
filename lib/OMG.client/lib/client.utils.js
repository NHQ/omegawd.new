exports.winX = window.innerWidth;

exports.winY = window.innerHeight;

exports.spaceTime = function(){return new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)};

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

exports.yodel = function(fn){
    var start = new Date().getTime();
    var hollar = function () {
        return function(e){
            fn(arguments)
            console.log(, new Date().getTime() - start)
        }                                    
    }
    return hollar()
};

exports.metaDbSave = function(){
		exports.yodel(omg.fs.writeFile('/metadb.json', JSON.stringify(omg.metaLocal), 'utf8', exports.yodel(function(e,r){
			console.log(e,r)
		})));
};