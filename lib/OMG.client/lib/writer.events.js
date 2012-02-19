var util = require('./client.utils.js')
,		Media = require('./media.js')
,		winX = util.winX
,		winY = util.winY
,		spaceTime = util.spaceTime
;

exports.newWriter = function(){ // this one feeld ugly

	var self = OMG
	,		tempMetaFileName = omg.user.name.replace(/\s/g, '_') + '.' + spaceTime() + '.meta.json'
	,		tempFileName = omg.user.name.replace(/\s/g, '_') + '.' + spaceTime() + '.json'
	,		file = new Media(
				{
					type: 'text', 
					owner: omg.user.name, 
					app: 'writer',
					location: '/temp/' + tempFileName
				})
	;
		
	util.metaDbSave();
	
	function initWriter(e, blob){		
		
		if(e) omg.errorHandler(e);
		
		file.blob = blob;
		
		omg.metaDbLocal[tempMetaFileName] = file;
		
		var reader = new FileReader();
				
		reader.onload = function(ev){
					
			file.textFile = ev.target.result;
		
			exports.writerFileLoaded(e, file)
		
		};
		
		reader.onerror = omg.errorHandler;
		
		reader.readAsText(file.blob)
		
	};
	
	omg.eve.on('newFileReady', initWriter);

	var nish = function(){

		util.yodel(omg.fs.writeFile('/temp/' + tempMetaFileName, JSON.stringify(file), 'utf-8', util.yodel(function(e,r){console.log(e,r)})));

		omg.fs.writeFile('/temp/' + tempFileName, 'Nothing has been written yet.','utf-8', omg.eve.remit('newFileReady'))

	};
	
	// fin 
	
	nish();	

};

exports.writerFileLoaded = function(e, file){
	
	omg.writer(e, file)
	
};

exports.saveWriter = function(file){
	
};

exports.loadWriter = function(file){
	
};

exports.deleteWriter = function(file){
	
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