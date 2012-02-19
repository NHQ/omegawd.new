var win = require('./client.utils.js')
,		events = require('./writer.events.js')
;

// NOTES: next up fix it up with the file system, local storage, user object

// NOTE: fix multi-line delete **BUG**

// NOTE: apps should usually have a prototypical file/document as argument 

module.exports = Writer;

function Writer(e, file){
				
				if(e){omg.errorHandler(e)}
				
     		var winX = win.winX
				,		winY = win.winY
				,		self = OMG
				,		TextMode = ace.require("ace/mode/text").Mode;
				;
				
				var writer = self.user.writer = self.user.writer || null;
				
				$('#editor').empty();
				
				if(!writer){
					writer = self.user.writer = {};  // new Person() ?
					self.user.writer.showScrollX = true;
					self.user.writer.setFontSize = 14;
					self.user.writer.setHighlightActiveLine = true;
					self.user.writer.showGutter = true;
					self.user.writer.autoSave = true;
				}
				
				self.user.writer.currentFile = file;
				
        // All google fonts JSON = https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCC3EWAlPbKZ1dYeq9zNovCmRh35PL2GQQ
        
				// this is init stuff
				console.log(file)
        editor = self.writer.editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode(new TextMode());
				editor.getSession().setValue(file.textFile);
        
        //options
        editor.setFontSize(writer.setFontSize + 'px')
        editor.setSelectionStyle(true ? "line" : "text");
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.session.setUseWrapMode(false);
        editor.session.setWrapLimitRange(55, 55);
        editor.renderer.setPrintMarginColumn(46);
        editor.setHighlightActiveLine(writer.setHighlightActiveLine)
//				editor.getSession().on('changeCharacterSize', function(e){consnole.log(OMG.writer.editor.container.style.fontSize)})
        // set dimensions and display
        // The default width is about 424px + 40px for the gutter = 464px
        
        writer.editor_width = function(){return editor.renderer.characterWidth * 55 + editor.renderer.$padding + editor.renderer.$cursorPadding}; // A hack, I ask, or not a hack?
        writer.gutter_width = function(){return $('.ace_gutter').width()};
        writer.fullSize = function(){return writer.editor_width() + writer.gutter_width()};
                 
        // setting the editors CSS perameters 
        $('#editor').css({
          left: ((winX - writer.fullSize()) / 2) + 'px',
          right : (winX - writer.fullSize()) / 2 + 'px',
          bottom: (winY / 2),
          top: (winY / 2) - (writer.setFontSize + 6),
          visibility: 'visible'
        });

        editor.focus()
        writer.lineCount = editor.getSession().getDocument().getLength();
				
        // set events
				$('#options').children().each(function(i, el){
					var attr, el = el;
					if(attr = $(el).attr('data-event')){
						switch (el.nodeName.toLowerCase()) {
							case 'select':
								$(el).val(writer[el.id])
							break;
							case 'input':
								$(el).attr('checked', writer[el.id])
							break;
						}
						$(el)[attr](events[el.id])
					}
				});
				/*
        $('#newWriter').click(self.events.newWriter)
        $('#saveWriter').click(self.events.saveWriter)
        $('#deleteWriter').click(self.events.deleteWriter)
        $('#retrieveWriter').click(self.events.retrieveWriter)
        
        $('#fontSizeSelect').change(self.events.fontSizeSelect)
        $('#showGutter').change(self.events.showGutter)
        $('#setHighlightActiveLine').change(self.events.setHighlightActiveLine)
        $('#showScrollX').change(self.events.showScrollX)
				*/
        // event for Highlighting
        
       // editor.getSession().selection.on('changeSelection', self.events.changeSelection);
				
				// move this to events 
			
        editor.getSession().on('change', function(e){
          if(editor.getSession().getDocument().getLength() > writer.lineCount){
            if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  <= (winY / 2) - 10) {
                 $('#editor').css(
                   'top', '-=' + editor.renderer.lineHeight
                 )
                 editor.resize() 
								$('.ace_sb').css('visibility','hidden');
            }
            else if (self.user.writer.showScrollX)
							$('.ace_sb').css('visibility','visible');
          }
          writer.lineCount = editor.getSession().getDocument().getLength();
        });

  };
  Writer.create = function(){
    events.newWriter()
  };
  Writer.update = function(){
    
  };
  Writer.delete = function(){
    
  };
  Writer.retreive = function(){
    
  };