var jsdom = require('jsdom').jsdom
,		apricot = require('apricot')
,		htmlparser = require('htmlparser')
,		_ = require('underscore')
,		fs = require('fs')
,		html = fs.readFileSync('./parser/rat.html', 'utf8').toString()
,		zoo = console.log
,		userAgent = require('useragent')
;

var	doc    = jsdom(null)
,		window = doc.createWindow();

jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.min.js' , function() {
//  window.$('body').append(html);
});

module.exports = function(){
	return parser
}


var parser = function(jQ, clientData, req, res){
		var agent = userAgent.parse(req.headers['user-agent'], clientData.userAgent)
		console.log(agent)
		var winX = 800
		,		winY = 1200
		,		fontSize = 16
		,		charsPerLine = 72
		,		lineHeight = Math.ceil(fontSize * 1.62)
		,		targetDimension = {
		      'height' : Math.min(winY * .9 , 720),
    		  'width' : Math.min(winX / 1.62, 960),
    		  'top': (winY - Math.min(winY * .9 , 720)) / 3,
    		  'left': (winX - Math.min(winX / 1.62, 960)) / 2
    		}
		,		testResults = [972, 12, 81] // elem width, pixelsPerChar, charCount
		,		pixelsPerChar = Math.ceil(testResults[0] / testResults[2])
		,		charConst = Math.ceil(fontSize / testResults[1]) // font-size / pixelsPerChar
		,		widthFactor = charsPerLine / charConst // CPL / charConst
		,		lineWidth = Math.min(charsPerLine * pixelsPerChar + 20, targetDimension.width)// room for innacuracy?
		,		linesPerPage = Math.floor(( .75 * winY ) / Math.floor(18 * 1.62))
		,		charsPerPage = linesPerPage * (lineWidth / pixelsPerChar)
		;
	
	var omg = function(errors, window) {
    var $ = window.$
		,		document = window.document
		,		b = document.getElementById('content')
		,		attr = 'width' // or whichever
		,		style = document.createElement('style')
		;

//		$('#article').attr('class', 'school') // this works for setting attribute odeValues proper, as it should
//		document.getElementById('abc').setAttribute('data-event', 'kisses') // so does this

		var tags = _.map(_.range(b.children.length), function(x){
				var elem = b.children[x]
				return {elem: elem, tag: elem._nodeName, class: elem._attributes.class ? elem._attributes.class._nodeValue : undefined, id: elem._attributes.id ? elem._attributes.id._nodeValue : undefined}
		})
		
		var elementary = function(elem){
			
		}
		

		zoo($('#article').css('width'))
  };

	jsdom.env({
	  html: html,
	  src: [
	    jQ
	  ],
	  done: omg
	});
	
}
