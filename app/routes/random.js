const Pagina = require('../../config/dbConnection');
const async = require('async');
const http = require('../../config/server');



/*function testAsync(){
	async.waterfall([
		function findPagina(callback){
			Pagina.findOne({pagina: 'treta'}, callback)
		},
		function createPagina(pagina, callback){
			Pagina.create({
				pagina: 'treta',
				acessos: 1
			}, callback)
		}
	],function logPagina(err, result){
		if(err) return console.log(err)
		console.log(result)
	})
}*/

module.exports = function(app){
	app.get('/favicon.ico',function(req, res){
		res.send('')
	})
	app.get('/:random', function(req, res){
		const getRandom = req.params.random;



		async.waterfall([
			/*function findPagina(callback){
				Pagina.findOne({pagina: getRandom}, callback)
			},*/
			function updateIfPageExists(callback){
				const updateView = {pagina: getRandom};
				Pagina.findOneAndUpdate(updateView, { $inc: { acessos: 1 } }, {upsert: true}, callback)
			}/*,
			function createPage(update, callback){
				if(update) return callback(null, null)
				Pagina.create({pagina: getRandom, acessos: 1}, callback)
			}*/
		], function(err, update){
			if(err){
				console.log(err)
				return res.status(500).send('erro interno')
			}
			//console.log(update)
			res.render("./random/random", {random: getRandom})
		})
	});
}
