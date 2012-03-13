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
            console.log(new Date().getTime() - start)
        }                                    
    }
    return hollar()
};

exports.spaceTime = function(){
	return new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)
};
