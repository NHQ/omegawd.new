var	hash = require('../node_modules/hashlib/build/Release/hashlib').hmac_sha1
	, md
	,	salt = 'poopRadish'
	, fs = require('fs')
	, personDB = require('../lib/personDB.js')
	,	utils = require('../../utils/utils.js')
	,	emailSpice = 'redtickcoonhound' // salt for creating objects ID
;

var person = function(obj){
	this._id = hash(obj.email, emailSpice)
	this.password = hash(obj.password, salt)
	this.salt = salt
	this.email = obj.email
	this.fname = 'Sans'
	this.lname = 'Nombre'
	this.location = null
	this.files = null
	this.age = ""
	this.dob = ""
	this.companies = undefined
	this.channels = null
	this.networks = null
	this.comments = undefined
	this.published = undefined
	this.comments = undefined
	this.date_created = utils.spaceTime()
	this.date_last_edited = utils.spaceTime()
};

module.exports = person;
