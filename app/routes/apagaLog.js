const Pagina = require('../../config/dbConnection');

module.exports = function(app){
		app.post("/apagaLog", function(req, res){
			Pagina.remove({}, function(err, doc){
				if (err) {
					console.log(err)
					return res.status(500).send('erro interno')
				}
				res.redirect("/dshboard");
			});
	});
};
