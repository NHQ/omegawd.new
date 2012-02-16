var win = require('./client.window.js')
,		winX = win.winX
,		winY = win.winY
;

exports.newWriter = function(){
	var self = OMG;
	OMG.writer()
};
exports.saveWriter = function(){
	
};
exports.loadWriter = function(){
	
};
exports.deleteWriter = function(){
	
};
exports.setFontSize = function(e){
	var self = OMG
	,		ole = self.writer.editor.renderer.lineHeight
	;

  self.user.writer.setFontSize = parseInt(this.value);
  self.writer.editor.setFontSize(this.value + 'px')
	self.writer.editor.resize() 

	$('#editor').css({
    left: ((winX - self.user.writer.fullSize()) / 2) + 'px',
    right : ((winX - self.user.writer.fullSize()) / 2) - 5 + 'px',
		top: (winY / 2) - (self.writer.editor.renderer.lineHeight * self.writer.editor.getSession().getDocument().getLength())
  });
	self.writer.editor.resize() 	
	$('.ace_sb').css('visibility','hidden');

	if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  >= (winY / 2) - 10){
		$('#editor').css({
			top: 10
		})
		if (self.user.writer.showScrollX)
			$('.ace_sb').css('visibility','visible');
	}
	self.writer.editor.resize() 	
  self.writer.editor.focus()
};

exports.showGutter = function(e){
	var self = OMG;
	self.user.writer.setShowGutter = this.checked;
	self.writer.editor.renderer.setShowGutter(this.checked)
};

exports.setHighlightActiveLine = function(e){
	var self = OMG;
	self.user.writer.setHighlightActiveLine = this.checked;
	self.writer.editor.setHighlightActiveLine(this.checked)
};

exports.showScrollX = function(e){
	var self = OMG;
	self.user.writer.showScrollX = this.checked;
	var bool = this.checked ? 'visible' : 'hidden';
	var test = require('./check.js')
	test('ahoy')
	$('.ace_sb').css('visibility', bool);
};

exports.createDocument = function(e){
};