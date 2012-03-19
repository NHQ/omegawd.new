var win = require('./client.utils.js')
	,	elemenos = ['div', 'a', 'p', 'img', 'audio', 'video', 'canvas', 'header', 'iframe']
;

var playground = function(){
	var self = this.playground; 
	
	$('body').empty()
	
	var blob = omg.fs.createBlob(omg.css['playground.css'], 'text/css', function(e,r){console.log(e,r)})
	,		dataURI = omg.fs.readDataUrl(blob, function(e,res){
									$('head').append('<link rel="stylesheet" href="' + res + '">')
									$('body').append(omg.jade('playground', {getSVG: win.getSVG, elemenos : elemenos}))
									initplayground.call(self)	
									if(e){omg.errorHandler(e)}
								});
								
	function initplayground(){
		this.stage = $('#stage')[0];
		paper.setup('xyRangeCanvas');
		var layer = new Layer();
		circle = new Path.Rectangle(view.center, new Size(10,100));
		circle.fillColor = 'yellow';
		view.draw();
		
		// event functions
		
		function createHTMLelem(evt){
			var target = document.querySelector('#target').value				
				,	relationship = document.querySelector('#relationship').value
				,	tag = document.querySelector('#elem').value
				,	elem = document.createElement(tag)
				,	subject = target === 'stage' ? $('#stage') : playground.selected || $('#stage')
			;
			elem.classList.add('media');
			elem.classList.add('pgSelected');
//		$('#toolSet').hide()
			subject[relationship](elem)
			$(elem).draggable({drag:function(e){console.log(e)}})
			playground.dragHelper = function(){return elem}			
		};
		
		// events listeners
		
		omg.eve.on('createHTMLelem', createHTMLelem)
		
		// event setters
		
		$('#createHTMLelem').mousedown(omg.eve.revent('createHTMLelem'))
		
		$('#createHTMLelem').draggable({helper: playground.dragHelper, drag: function(e){console.log(e)}})
		
		$('input').change(function(e){
					var val = parseFloat(e.target.value)
						,	p = new Point(val, circle.position.y)
						; 
					circle.position.x = val
				})	
		};
};

playground.createHTMLelem = function(data){
	var elem = document.createElement(data[2])
		, target = (data[0] === 'stage') ? 
								playground.stage :
								playground.selected || stage
	;
	
	elem.setAttribute('class', 'media selected')
	elem.setAttribute('draggable', 'true')
	
	target.appendChild(elem)
	
	
	console.log(data)
}


module.exports = playground;

































































