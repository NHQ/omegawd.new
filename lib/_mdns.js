#!/usr/bin/env node
var http = require('http')
	, mdns    = require('mdns')
	, server = http.createServer()
  ,	browser = mdns.createBrowser(mdns.tcp('http'));
;


var txt_record = {
    name: 'omg server name: one'
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

server.listen(4321, function(){
	mdns.createAdvertisement(mdns.tcp('http') , server.address().port, {txtRecord : txt_record} ).start();
});
