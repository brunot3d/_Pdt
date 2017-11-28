const async = require('async');
const http = require('../../config/server');


module.exports = function(app, db){
	app.get('/favicon.ico',function(req, res){
		res.send('')
	})
	app.get('/:random', function(req, res){
		const getRandom = req.params.random

		async.waterfall([
			function updateIfPageExists(callback){
        db.collection('paginas').findOneAndUpdate(
					{pagina: getRandom},
					{ $inc: { acessos: 1 } },
					{upsert: true},
					callback)
			}
		], function(err, doc){
			if(err){
				console.log(err)
				return res.status(500).send('erro interno')
			}
			db.collection('paginas').findOne({pagina:getRandom}, function(err, pagina){
				if(err) return
				res.render("./random/random", {paginaObj: pagina} )
			})

			})
		})
	}
