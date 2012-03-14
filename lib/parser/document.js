var stylus = require('stylus')
	,	jade = require('jade')
	,	fs = require('fs')
;

module.exports.Document = Document;
module.exports.agencyTest = agencyTest;

/*

@content	content object, with meta data, file references, possibly child document objects. 
					when possible for document with text content, a bare version String will be included
					but most likely content includes html (this remains to be seen)
					and published template information

@context	context object, with data about the browser/window/client environes
					also layout and template assertions
					which are set by a mix of defaults, client variables, 
					and the designs of the published article
					
					perhaps this constructor is the thing that yields a published article
					or they are related by inheritence.
					?

*/
var Document = function(content, context){
	
	var context = exports.agencyTest(context)
	
//	var stylusTemplate = fs.readFileSync('./html/' + content.template.id + '.jade', 'utf8')
	
	var determineOptimalDimensions = function (context){
		
		var d = {
			'height' : Math.min(context.winY * .9 , 720),
	  	'width' : Math.min(context.winX / 1.62, 960),
	  	'top': (context.winY - Math.min(context.winY * .9 , 720)) / 3,
	  '	left': (context.winX - Math.min(context.winX / 1.62, 960)) / 2
		}	
		
		return d
	
	};

	function book(){
		
		if()
		
		var	fontSize = 18
		,		charsPerLine = 72
		,		lineHeight = Math.floor(fontSize * 1.63)
		,		pixelsPerChar = Math.ceil(context.testResults[0] / context.testResults[2])
		,		charConst = Math.ceil(fontSize / pixelsPerChar) // font-size / pixelsPerChar
		,		widthFactor = charsPerLine / charConst // CPL / charConst
		,		lineWidth = Math.min(charsPerLine * pixelsPerChar + 20, targetDimension.width)// room for innacuracy?
		,		linesPerPage = Math.floor(( .75 * winY ) / Math.floor(18 * 1.62))
		,		charsPerPage = linesPerPage * (lineWidth / pixelsPerChar)
		;	
	}
	
}

function agencyTest(context){
	
	var clientClass = context.agent.clientClass = ''
	var touchEnabled = context.agent.touchEnabled = false
	
	switch (true){
		
		case (context.agent.os.toLowerCase() === 'ios'):
			clientClass += 'ios '
			touchEnabled = true
		;
		
		case (context.agent.family.toLowerCase().instanceOf('ipad')):
			clientClass += 'ipad '
			touchEnabled = true
		;
		
		case (context.agent.os.toLowerCase().instanceOf('android')):
			clientClass += 'mobile android '
			touchEnabled = true
		;
		
		case (context.agent.family.toLowerCase().instanceOf('mobile')):
			clientClass += 'mobile '
			touchEnabled = true
		;
	}
	
	return context
	
}