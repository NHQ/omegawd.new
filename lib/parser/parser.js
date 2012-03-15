var jsdom = require('jsdom').jsdom
,		apricot = require('apricot')
,		htmlparser = require('htmlparser')
,		_ = require('underscore')
,		fs = require('fs')
,		html = fs.readFileSync('./parser/rat.html', 'utf8').toString()
,		textStr = fs.readFileSync('./parser/mouse.txt', 'utf8').toString()
,		zoo = console.log
,		userAgent = require('useragent')
;

var doc = {
	textStr : textStr,
	content : html,
	style : 'css',
	layout : 'fixed',
	template : {
		id : 'book',
		targetDimensions : function(context) {
		      var d = {'height' : Math.min(context.winY * .9 , 720),
	  		  'width' : Math.min(context.winX / 1.62, 960),
	  		  'top': (context.winY - Math.min(context.winY * .9 , 720)) / 3,
	  		  'left': (context.winX - Math.min(context.winX / 1.62, 960)) / 2}
					return d;
	  		}
	} // in the future, these will be object IDs, refs to unique objects, as set by the design tweaks per publication 
}

var parser = function(jQ, clientData, req, res){
		var agent = userAgent.parse(req.headers['user-agent'], clientData.userAgent)
		console.log(agent)
		res.writeHead('200')
		res.end('poops')
		
		// Fake sample client
		
		var winX = 800
		,		winY = 1200
		,		screenX = 1920
		,		screenY = 1054
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
		, 	widths = charCounts = avgs = []
		;
	
	var context = {
		client : {
			agent : agent,
			winX : winX,
			winY : winY,
			screenX : screenY,
			screenY : screenY,
			testResults : [18775, 947, widths, charCounts, avgs] // [totalWidth, charCount, ] // OLD [972, 12, 81] // [width of test text, pixels per char, number chars in test string]
		}
	};
	
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
		
  };

	jsdom.env({
	  html: doc.html,
	  src: [
	    jQ
	  ],
	  done: omg
	});
	
}


module.exports = parser