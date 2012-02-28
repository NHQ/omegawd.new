var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		_ = require('underscore')
,		yodel = require('./utils/utils.js').yodel
,		parseURL = require('url').parse
,		path = require('path')
,		resolvedPath = path.resolve('./', './OMG.client')
,		templates = require('./OMG.client/lib/template.compiler.js')(resolvedPath)
;
	
var path = "./OMG.client/deps"
,		touchy = fs.readFileSync(path + '/Store.js', 'utf8')
,		jQ = fs.readFileSync(path  + '/jquery-1.6.2.min.js', 'utf8')
,		transform = fs.readFileSync(path + '/transformjs.js', 'utf8')
,		$_ = fs.readFileSync(path + '/underscore-min.js', 'utf8')
,		touchy = fs.readFileSync(path + '/touchy.js', 'utf8')
,		bean = fs.readFileSync(path + '/bean.js', 'utf8')
,		store = fs.readFileSync(path + '/store.js', 'utf8')
,		webFS = fs.readFileSync(path + '/webfs.js')
,		Ev = fs.readFileSync(path + '/eventemitter2.js', 'utf8')
,		paper = fs.readFileSync(path + '/paper.js', 'utf8')
,		js_libs = jQ + $_ + transform + bean + store + webFS + Ev + paper
;


server.listen(3333)

server.use(connect.static(__dirname + '/OMG.client'));

server.use(function(req,res, next){

	res.writeHead('200');

	res.end(js_libs)

})

var browserify = require('browserify')
,		bundle = browserify({
			require : __dirname + '/OMG.client/index.js',
			watch: true,
		})

server.use(bundle)

var	fileify = require('fileify')

bundle.use(fileify('css', __dirname + '/OMG.client/css'))

