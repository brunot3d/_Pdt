const Pagina = require('../../config/dbConnection');


module.exports = function(app){
	app.get('/dshboard', function(req, res){
			Pagina.find(function(err, paginas) {
			    if (err) {
						console.log(err)
						return res.status(500).send('erro interno')
					}
					res.render("./dshboard/dshboard", {paginas: paginas})
			});
	});
};
