var win = require('./client.window.js')
,		winX = win.winX
,		winY = win.winY
;

exports.fontSizeSelect = function(e){
	console.log('events', this)
	var self = OMG;
  self.user.fontSize = this.value + 'px';
  self.editor.setFontSize(this.value + 'px')
  console.log(editor_width(), gutter_width(), fullSize())
             $('#editor').css({
               left: ((winX - fullSize()) / 2) + 'px',
               right : ((winX - fullSize()) / 2) - 5 + 'px'
             });
             editor.focus()
					}
