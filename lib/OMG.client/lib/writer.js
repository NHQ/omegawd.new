var win = require('./client.window.js')
;

module.exports = writer;

function writer(){
				console.log(self, this)
     		var winX = win.winX
				,		winY = win.winY
				,		self = OMG
				;


        // All google fonts JSON = https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCC3EWAlPbKZ1dYeq9zNovCmRh35PL2GQQ
        
        editor = self.editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        var TextMode = ace.require("ace/mode/text").Mode;
        editor.getSession().setMode(new TextMode());
        
        //options
        editor.setFontSize('12px')
        editor.setSelectionStyle(true ? "line" : "text");
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.session.setUseWrapMode(true);
        editor.session.setWrapLimitRange(55, 55);
        editor.renderer.setPrintMarginColumn(46);
        editor.setHighlightActiveLine(false)
        // set dimensions and display
        // The default width is about 424px + 40px for the gutter = 464px
        
            editor_width = function(){return editor.renderer.characterWidth * 55 + editor.renderer.$padding + editor.renderer.$cursorPadding} // A hack, I ask, or not a hack?
        ,   gutter_width = function(){return $('.ace_gutter').width()}
        ,   fullSize = function(){return editor_width() + gutter_width()}
        ;
        
        console.log(editor_width(), gutter_width(), fullSize())
                    
        $('#editor').css({
          left: ((winX - fullSize()) / 2) + 'px',
          right : (winX - fullSize()) / 2 + 'px',
          bottom: (winY / 2),
          top: (winY / 2) - editor.renderer.lineHeight - 3,
          visibility: 'visible'
//             'border-right' : '1px solid #000'
        });
        editor.focus()
        
        // set events
        
        $('#fontSizeSelect').change(self.events.fontSizeSelect)
        
        // helper reminders
        
        editor.getSession().selection.on('changeSelection', function(e){
        // de nada
        });

        editor.getSession().on('change', function(e){
          if(editor.getSession().getDocument().getLength() > writer.lineCount){
            if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  <= (winY / 2) - 10) {
                 $('#editor').css(
                   'top', '-=' + editor.renderer.lineHeight
                 )
                 editor.resize() 
            }
            else $('.ace_sb').css('visibility','visible');
          }
          writer.lineCount = editor.getSession().getDocument().getLength();
        });

  };
  writer.lineCount = 1;
  writer.create = function(){
    
  };
  writer.update = function(){
    
  };
  writer.delete = function(){
    
  };
  writer.retreive = function(){
    
  };