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
		
		var d = templateDimensions = { // page dimensions and vector, within the "book" template
			'height' : (context.winY >= 720) ? context.winY * .9 : context.winY,
	  	'width' : (context.winX >= 960 ) ? context.winX / 1.62 : context.winX,
	  	'top': (context.winY <= 720) ? 0 : (context.winY - (context.winY * .9)) / 3,
	  	'left': (context.winX <= 960 ) ? 0 : (context.winX - (context.winX / 1.62)) / 2
		};	
		
		var	emRatio = 10 // this is set in the css body declaration for font size as 62.5% src: 
		, 	fontSize = 1.6
		,		padding = 10
		,		charsPerLine = 72
		,		lineHeight = Math.floor(fontSize * emRatio * 1.63)
		,		pixelsPerChar = Math.ceil(context.testResults[0] / context.testResults[2])
		,		lineWidth, LinesPerPage, lineUnitRect
		;
		
		return d
	
	};
	
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