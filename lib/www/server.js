var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		path = require('path')
,		path = require('path')
,		resolvedPath = path.resolve('./')
,		auth = require('../authentication/server.js')
;

var app = {auth: auth};

server.use(function(req, res, next){
	req.__Server = server;
	next();
});
server.use(connect.cookieParser('keyboard cat'))
			.use(connect.bodyParser())
			.use(connect.session({ secret: 'whatwhat', key: 'sid', cookie: { secure: true }}))
			.use(function(req, res, next){
				req.domani = req.headers.host.split('.');
				app[req.domani[0]](req, res);
//				next();
			});
//			.use(auth)
			
server.listen(3000);

function Static (req, res){
	
	return connect.static('/public')
}