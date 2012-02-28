var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		bundle = require('browserify')({require : __dirname + '/OMG.client/index.js', watch: true, ignore: ['css']})
//,		zlib = require('zlib')
,		_ = require('underscore')
,		yodel = require('./utils/utils.js').yodel
,		parseURL = require('url').parse
,		path = require('path')
,		resolvedPath = path.resolve('./', './OMG.client')
,		templates = require('./OMG.client/lib/template.compiler.js')(resolvedPath)
,		fileify = require('fileify')
;

bundle.use(fileify('css', __dirname + '/OMG.client/css'))

module.exports = clientDeps();

function clientDeps(cb){
	
	var path = "./OMG.client/deps";
				
	var touchy = fs.readFileSync(path + '/Store.js', 'utf8')
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
	,		initServer = function(){
		
					server.use(bundle)

					server.use(function(req, res, next){

						req.furl = parseURL(req.headers.host + req.originalUrl)
						
						if (req.furl.pathname.indexOf('templates') > 0){
						
							var file = fs.readFileSync('./OMG.client' + req.furl.pathname, 'utf8');
						
							var jadeParse = jade.compile(file, {filename: './OMG.client' + req.furl.pathname, pretty: true})
							
							res.writeHead('200')

							res.end(jadeParse())
						
						}
						
						else {
													
							return next()
						
						}
											
					});

					server.use(connect.static(__dirname + '/OMG.client'));

					server.use(function(req,res, next){

						res.writeHead('200');

						res.end(js_libs)

					})

					server.listen(3333)

					console.log('localhost:3333/html/start.html')
					
				}
	;
	
	initServer()
	console.log('initing(!)')
}
