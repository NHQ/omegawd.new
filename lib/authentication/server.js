var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		_ = require('underscore')
,		parseURL = require('url').parse
,		path = require('path')
,		Person = require('./lib/people.js')
,	 	personDB = require('./lib/personDB.js')
,		compile = require('../jade.compiler')
,		path = require('path')
,		resolvedPath = path.resolve('./')
;

var authentication = function(req, res){
	var p = parseURL(req.url);
	
	if (req.method === 'GET')
	{
		
		res.writeHead('200', {
			'Content-type' : 'text/html'
		});
		
		switch (p.pathname.toLowerCase())
		{
			case '/':

				res.write(compile('/auth', 'layout', {body: 'index', title: 'You got SWerved!'}))

			break;

			case '/join':

				res.write(compile('/auth', 'layout', {body: 'create', title: 'You got SWerved!'}))

			break;
		}
				
	}
	
	else if (req.method === 'POST')
	{
		
		
		res.writeHead('302', {
			'Location' : 'http://localhost:3000/',
			'Content-Type' : 'text/html'
		});
		
		switch (p.pathname.toLowerCase())
		{
			case '/login':
			
				var verification = function(err, result){
					if(err){console.log('ERROR ' + err, 'RESULT: ' + result); return}
					switch (typeof result) {
						case 'string':
							
							res.write(compile('/auth', 'layout', {body: 'index', title: result}))
						
						break;
						case 'object':
						
							res.write(compile('/auth', 'layout', {body: 'profile', title: 'welcome back ' + result.fname + ' ' + result.lname, info: JSON.stringify(result)}))
							
						break;
						case 'boolean':
							console.log(res);
							
							res.write('he;')
					//		res.write(compile('/auth', 'layout', {body: 'index', title: 'unknown error'})) 
//							res.write(compile('/auth', 'layout', {body: 'index', title: 'wrong email or password'}))
						break;
					}		
				}

				/* down here */

				personDB.verify(req.body, verification)
				
				res.end();

//				res.write(compile('/auth', 'layout', {body: 'index', title: 'You got SWerved!'}))

			break;

			case '/create':

				res.write(compile('/auth', 'layout', {body: 'create', title: 'You got SWerved!'}))

			break;
		}
	}


	res.end();

};

server.use(connect.bodyParser());
server.use(authentication);

server.listen(3000);

module.exports = server;
