var win = require('./client.utils.js')
	,	elemenos = ['div', 'a', 'p', 'blockquote', 'textarea', 'ul', 'li', 'ol', 'form', 'input', 'button', 'canvas', 'header', 'iframe']
	, concepts = ['context', 'text', 'shapes', 'lines', 'link', 'header', 'iframe', 'ordered list', 'unordered-list', 'quotation', 'canvas', 'files & media', 'javascripts'  ]
	,	cssProps = ['background', 'height', 'width', 'position', 'color', 'border-radius', 'border', 'top', 'left', 'right', 'bottom', 'line-height', 'font-size', 'font-family', 'padding', 'margin', 'box-shadow', 'text-shadow', 'z-index', 'text-decoration', 'zoom', 'display', 'visibility', 'transform', 'transform-origin', 'transform-style', 'backface-visibility', 'transition', 'animation']
	,	ddUpload = require('./ddUpload.js')
	,	Canvas = require('./canvas.js')
;
	
var playground = function(){
	
	var self = this;
		
	this.init = function (){

		$('body').empty();
		var blob = omg.fs.createBlob(omg.css['playground.css'], 'text/css', function(e,r){console.log(e,r)})
		,		dataURI = omg.fs.readDataUrl(blob, function(e,res){
										$('head').append('<link rel="stylesheet" href="../css/ui-lightness/jqueryui.ui.css">')
										$('head').append('<link rel="stylesheet" href="' + res + '">')
										$('body').append(omg.jade('playground', {getSVG: win.getSVG, elemenos : elemenos}))
										next.call(self)
										if(e){omg.errorHandler(e)}
									});							

		function next(){
			$('ranger').change(omg.eve.revent('rangeSelectorChange'))
			self.stage = document.getElementById('stage');
			ddUpload('curtain', 'newMedia', false, false);
			
			self.selectMouseUp = function(e){	
				
				if(self.selected && this.id === self.selected.id) return;
				if(self.selected && this.id != self.selected.id) {
					self.selected.parentElement.classList.remove('selected');
					this.parentElement.classList.add('selected');
					self.selected = this;
					computeObj(this);
				}
				if(!self.selected){
					this.parentElement.classList.add('selected');
					self.selected = this;
					computeObj(this);
				}
				
				function computeObj(elem){
					var elemStyles = window.getComputedStyle(elem)
						, range = _.range(elemStyles.length)
					;
					
					self.selected.styles = {}

					range.forEach(function(x){
						self.selected.styles[elemStyles[x]] = elemStyles.getPropertyCSSValue(elemStyles[x])
					});
					
					var undefinedProperties = [];
					self.selectedObject = _.map(range, function(x){
								var val = elemStyles.getPropertyCSSValue(elemStyles[x])
								,		primitive = win.getCSSPrimitiveValue(val)
								,		o = {property: elemStyles[x], value: val, primitive : primitive}
								;
								if(!o.primitive){
									undefinedProperties.push(o)
								}
								return o
							});
					return;
				}
				
				self.targetView()
				
			};
			
			self.targetView = function(obj){
				
				var options = $('#toolSet').empty().append(omg.jade('elemTargetView', {selected : {css : self.selectedObject, html : self.selected}}))
				options.children().find('.cssString')
				.click(function(evt){
					var startNode = this.childNodes[0];
					var range = document.createRange();
					range.setStart(startNode, 0);
					range.setEnd(startNode, startNode.length);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				})
				.keyup(function(evt){
					var cssProp = this.parentNode.id
					;
					$(self.selected).css(cssProp, this.textContent);
					
				});
				options.css('overflow', 'auto').children().find('.cssPrimitives').click(function(evt){
									
					var cssProp = this
						,	child = $('#' + cssProp.id + ' .cssPrimitiveVal')
					;
					switch (cssProp.getAttribute('data-type').toLowerCase()) {
					
						case 'string':
							return
						break;
					
						case 'float':
							var primVal = parseFloat(child.attr('data-value'))
								,	range = $('.ranger')
							;
							
						  range.attr('min', 0 - Math.abs(0 - primVal) - 200)
							 		 .attr('max', 200 + 0 + Math.abs(0 - primVal) * 2)
							 		 .val(primVal)
							 		 .unbind('change')
									 .bind('change', function(){
											var val = this.value
											;
											$(self.selected).css(cssProp.id, parseFloat(val) + 'px')
							 		  	child.html(this.value)
							 		 })						
						
						break;
						
						case 'string' :
						
						break;
				
						case 'rgb' : 
						if(omg.eve.listeners('palTest').length > 0)	{omg.eve.listeners('palTest').pop(0)};
						omg.eve.on('palTest', function(cssStr){
							$(self.selected).css(cssProp.id, cssStr);
			 		  	child.text(cssStr)
						})
						
						break;
				
					}
					
					return
	
				})
			};
			var c = document.createElement('canvas');
			c.id = 'xyRangeCanvas';
			c.classList.add('xyRangeCanvas');
			$('#stage').append(c);
			var canvas = Canvas('xyRangeCanvas', [300,300]);
			canvas.colorPicker.init.call(canvas);
			

		// event functions

		function createHTMLelem(evt, elem){
			
			var id = function(){return new Date().getTime().toString()}
			
			var wrapper = document.createElement('div');
					wrapper.classList.add('wrapper');
					wrapper.id = 'wrapper' + id();
					
			var target = document.querySelector('#target').value				
				,	relationship = document.querySelector('#relationship').value
				,	tag = evt ? $(evt.target).attr('data-type') : null
				,	elem = elem || document.createElement(tag)
				,	subject = target === 'stage' ? $('#stage') : $(self.selected) || $('#stage')
			;
			
			elem.id = 'elem' + id();
			elem.classList.add('media');
			wrapper.appendChild(elem);
			
			subject[relationship]($(wrapper));
			$(elem).bind('mouseup', self.selectMouseUp);
			$(wrapper).draggable();
			if(/button{1}/i.test(elem.tagName)){
				elem.setAttribute('type', 'button')
				elem.textContent = 'Click Button'
			}
			if(/audio{1}|video{1}|img{1}/i.test(elem.tagName)){
				$(wrapper).resizable({
					aspectRatio : true,
					autoHide : true,
				});
				return
			}			
			else
				$(wrapper).resizable({
					autoHide : true,
				});
				return
		};

		function handleMedia(elem){
			var id = function(){return new Date().getTime().toString()};
			elem.id = 'elem:' + id;
			elem.classList.add('media')
		};

		// events listeners

		omg.eve.on('createHTMLelem', createHTMLelem)
		omg.eve.on('newMedia', createHTMLelem)
		// event setters

		$('.createHTMLelem').mousedown(omg.eve.revent('createHTMLelem'))

		};
	};
	return this
};




module.exports = playground;

































































