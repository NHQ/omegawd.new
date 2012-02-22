var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		bundle = require('browserify')({require : __dirname + '/OMG.client/index.js', watch: true})
//,		zlib = require('zlib')
,		styles = require('stylus')
,		_ = require('underscore')
,		jade = require('jade')
,		yodel = require('./utils/utils.js').yodel
;


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
	,		jadeTempl = fs.readFileSync('./OMG.client/html/templates/start.jade', 'utf8')
	,		css = fs.readFileSync('./OMG.client/css/logo.style', 'utf8')
	,		jadefn = jade.compile(jadeTempl, {filename: './OMG.client/html/templates/start.jade', pretty: true})
	,		js_libs = jQ + $_ + transform + bean + store + webFS + Ev + paper
	,		html = jadefn({list: _.range(37)})
	,		initServer = function(){
					server.use(bundle)

					server.use(function(req, res, next){
						next()
					})

					server.use(connect.static(__dirname + '/OMG.client'));

					server.use(function(req,res, next){

						res.writeHead('200');

						res.end(js_libs)

					})

					server.listen(3333)

					console.log('localhost:3333/html/start.html')

				}
	;
	
	fs.writeFileSync('./OMG.client/html/start.html', html, 'utf8');

	styles(css)
		.define('pist', (function(){return _.range(37) }()))
		.render(function(err, css){
	  	if (err) throw err;
			else 
			fs.writeFileSync('./OMG.client/css/start.css', css, 'utf8')
			initServer()
		});
	
}

