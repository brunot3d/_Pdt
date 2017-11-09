const Pagina = require('../../config/dbConnection');

module.exports = function(app){
		app.post("/zeraViews", function(req, res){
			Pagina.update({}, {acessos:0}, {multi:true},function(err, doc){
				if(err){
					console.log(err)
				}else{
					res.redirect("/dshboard")
				}
			});
	});
};