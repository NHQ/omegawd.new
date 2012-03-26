var connect = require('connect')
,		fs = require('fs')
,		server = connect()
//,		zlib = require('zlib')
,		_ = require('underscore')
,		yodel = require('./utils/utils.js').yodel
,		parseURL = require('url').parse
,		path = require('path')
,		resolvedPath = path.resolve('./', './OMG.client')
,		templates = require('./OMG.client/lib/template.compiler.js')(resolvedPath)
,		fileify = require('fileify')
,		bjade = require('browserijade')
,		bundle = require('browserify')({watch: true})
			.ignore(['css', 'svg'])
			.use(fileify('css', __dirname + '/OMG.client/css'))
			.use(fileify('svg', __dirname + '/OMG.client/images', '.svg'))
			.use(bjade(__dirname + '/OMG.client/html/client'))
			.require(__dirname + '/OMG.client/index.js')
;

module.exports = clientDeps();

function clientDeps(cb){
	
	var path = "./OMG.client/deps";
					
	var touchy = fs.readFileSync(path + '/Store.js', 'utf8')
	,		jQ = fs.readFileSync(path  + '/jquery-1.6.2.min.js', 'utf8')
	,		jQui = fs.readFileSync(path  + '/jquery.ui.min.js', 'utf8')
	,		transform = fs.readFileSync(path + '/transformjs.js', 'utf8')
	,		$_ = fs.readFileSync(path + '/underscore-min.js', 'utf8')
	,		touchy = fs.readFileSync(path + '/touchy.js', 'utf8')
	,		bean = fs.readFileSync(path + '/bean.js', 'utf8')
	,		store = fs.readFileSync(path + '/store.js', 'utf8')
	,		webFS = fs.readFileSync(path + '/webfs.js')
	,		Ev = fs.readFileSync(path + '/eventemitter2.js', 'utf8')
	,		paper = fs.readFileSync(path + '/paper.js', 'utf8')
	,		stylus = fs.readFileSync(path + '/stylus.client.js', 'utf8')
	,		js_libs = jQ + '/* JqUI */' + jQui + $_ + transform + bean + store + webFS + Ev + stylus + paper
	,		parser = require('./parser/parser.js')
	,		initServer = function(){
		
					server.use(bundle)
					server.use(connect.bodyParser())
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
					
					server.use(function(req, res, next){
						if(req.method.toLowerCase() !== 'post')
							next()
						else {
							var clientData = JSON.parse(decodeURIComponent(req.furl.pathname.slice(1)));
							parser(jQ.toString(), clientData, req, res)
						}
					});
					
					server.use(function(req,res, next){
						res.setHeader('Content-Type', 'text/javascript')

						res.writeHead('200');

						res.end(js_libs)

					});

					server.listen(3333)

					console.log('localhost:3333/html/start.html')
					
				}
	;
	
	initServer()
	console.log('initing(!)')
}
