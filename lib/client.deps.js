var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		bundle = require('browserify')(__dirname + '/OMG.client/index.js')
,		zlib = require('zlib')
;

server.use(bundle)
server.use(function(req,res){
	var touchy = fs.readFileSync('./Store.js', 'utf8')
	,		jQ = fs.readFileSync('./jquery-1.6.2.min.js', 'utf8')
	,		transform = fs.readFileSync('./transformjs.js', 'utf8')
	,		_ = fs.readFileSync('./underscore-min.js', 'utf8')
	,		touchy = fs.readFileSync('./Touchy.js/touchy.js', 'utf8')
	,		bean = fs.readFileSync('./bean/bean.js', 'utf8')
	,		store = fs.readFileSync('./store.js', 'utf8')
	,		filer = fs.readFileSync('./filer.js/src/filer.js', 'utf8')
	;
	res.writeHead('200');
/*
	var files = jQ + _ + transform + bean + store + filer;
	var buff = new Buffer(files.length);
	buff.write(files)
	var gzipped = zlib.gzip(buff, function(e, f){
		res.end(f)
	})
*/
	res.end(jQ + _ + transform + bean + store + filer)
//	console.log(touchy.toString('utf8'))
})

server.listen(3333)

