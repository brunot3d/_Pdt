var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/pdt';
var db = null
var MongoClient = MongoClient.connect(url, function(err, mongodb){
	db = mongodb
})
module.exports = db;
