exports.yodel = function(fn){
    var start = new Date().getTime();
    var fn = fn;
    var hollar = function () {
        return function(e){
            fn(arguments[0], arguments[1])
            console.log('yodel', new Date().getTime() - start)
        }                                    
    }
    return hollar()
};

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};