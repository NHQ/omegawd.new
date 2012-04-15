#!/usr/bin/env node
var http = require('http')
	, mdns    = require('mdns')
	, server = http.createServer()
  ,	browser = mdns.createBrowser(mdns.tcp('http'));
;

var txt_record = {
    name: 'bacon'
  , chunky: true
  , strips: 5
};

browser.on('serviceUp', function(service) {
	
	var options = {
	  host: service.addresses[0],
	  port: service.port
	};
	
  http.get(options, function(res){
		console.log(options)
	})

});

browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});

browser.start();

server.on('request', function(req, res){
	console.log('hola')
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1 style="font: 80px helvetica">:^*</h1>')
})

server.listen(4321, function(){
	mdns.createAdvertisement(mdns.tcp('http') , server.address().port, {txtRecord : txt_record} ).start();
});
