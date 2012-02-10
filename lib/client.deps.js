var connect = require('connect')
,		fs = require('fs')
,		server = connect()
;

server.use(function(req,res){
	var touchy = fs.readFileSync('./Store.js')
	,		jQ = fs.readFileSync('./jquery-1.6.2.min.js')
	,		transform = fs.readFileSync('./transformjs.js')
	,		_ = fs.readFileSync('./underscore-min.js')
	,		touchy = fs.readFileSync('./Touchy.js/touchy.js')
	,		bean = fs.readFileSync('./bean/bean.js')
	,		store = fs.readFileSync('./store.js')
	,		filer = fs.readFileSync('./filer.js/src/filer.js')
	;
	res.writeHead('200');
	res.end(jQ + _ + transform + bean + store + filer)
//	console.log(touchy.toString('utf8'))
})

server.listen(3333)

