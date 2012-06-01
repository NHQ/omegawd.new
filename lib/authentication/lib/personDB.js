var fs = require('fs')
	,	hash = require('../node_modules/hashlib/build/Release/hashlib').hmac_sha1
	,	utils = require('../../utils/utils.js')
	, client = require('redis').createClient()
	,	async = require('async')
	,	emailSpice = 'redtickcoonhound'
	,		path = require('path')
	,		resolvedPath = path.resolve('./', '../authentication/peopleDB')
;

/*
 *	newPerson._id is email hashed
 */

client.select('people');



exports.verify = function(obj, cb){ // @obj === submited form data, req.body
	
	var id = hash(obj.email, emailSpice)
		,	pw = obj.password
		,	cb = cb
	;
	
	async.parallel([checkRedis, checkHard], evaluate)
	
	function checkRedis(cb){
		client.hgetall(id, cb)
	};

	function checkHard(cb){
		fs.readFile('./peopleDB/' + id, 'utf8', cb)
	};

	function evaluate(err, result){
		if(err){cb(null, true); /*  no such user in hard db */ return}
		
		var hardData = JSON.parse(result[1]);
		
		if(result[0] && hardData){
				
			var user = 
					result[0].date_last_edited >= hardData.date_last_edited ?
					result[0] : 
					hardData 
				,	hashedPass = hash(pw, user.salt)
				;
				
			cb(null, (hashedPass === user.password) ? user : 'Wrong password')
			
		}
		
		else cb(null, false)
		
	};
	
};

exports.update = function(person){
	
};

exports.del = function(person){
	
};

exports.create = function(newPerson){
	
	try { // user email already exists // Also this ty catch shit is lame
	
		var p = fs.statSync(resolvedPath + '/' + newPerson._id); // if its not there, Node will throw up error
						
		return true
	
	}
	
	catch(err) { // no duplicate
				
		fs.writeFileSync(resolvedPath + '/' + newPerson._id, JSON.stringify(newPerson), 'utf8')
				
		client.hmset(newPerson._id, newPerson, function(e,r){if(e)console.log(e)})
		
		return false
		
	}
		
};

