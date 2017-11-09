
module.exports = function(app){
	app.get("/", function(req, res){
		res.render("./home/index");
	});
	// app.post("/autenticar", function(req,res){
	// 	const login = req.body;
	// 	res.send(login)
	// 	});
	// })
};
