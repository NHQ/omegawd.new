exports.toggle = function(){this.x = true;return function(){return this.x ? this.x = false : this.x = true}}

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

exports.spaceTime = function(){ // ERROR NOT RIGHT
	return new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)
};

exports.mode = function (array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
                modeMap[el] = 1;
        else
                modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
                maxEl = el;
                maxCount = modeMap[el];
        }
    }
    return maxEl;
}