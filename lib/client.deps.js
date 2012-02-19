var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		bundle = require('browserify')({require : __dirname + '/OMG.client/index.js', watch: true})
,		zlib = require('zlib')
;

var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

console.log(new Date().getTime())

var touchy = fs.readFileSync('./Store.js', 'utf8')
,		jQ = fs.readFileSync('./jquery-1.6.2.min.js', 'utf8')
,		transform = fs.readFileSync('./transformjs.js', 'utf8')
,		_ = fs.readFileSync('./underscore-min.js', 'utf8')
,		touchy = fs.readFileSync('./Touchy.js/touchy.js', 'utf8')
,		bean = fs.readFileSync('./bean/bean.js', 'utf8')
,		store = fs.readFileSync('./store.js', 'utf8')
,		webFS = fs.readFileSync('./webfs/lib/webfs.js')
,		Ev = fs.readFileSync('./EventEmitter2/lib/eventemitter2.js', 'utf8')
;

var orig_code = jQ + _ + transform + bean + store + webFS + Ev;

console.log(new Date().getTime())


server.use(bundle)
server.use(function(req,res){
//	var ast = jsp.parse(orig_code); // parse code and get the initial AST
//	ast = pro.ast_mangle(ast); // get a new AST with mangled names
//	ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
//	var final_code = pro.gen_code(ast); // compressed code here
	res.writeHead('200');
/*
	var files = jQ + _ + transform + bean + store + filer;
	var buff = new Buffer(files.length);
	buff.write(files)
	var gzipped = zlib.gzip(buff, function(e, f){
		res.end(f)
	})
*/

	res.end(orig_code)
//	console.log(touchy.toString('utf8'))
})

server.listen(3333)

