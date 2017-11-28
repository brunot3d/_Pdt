module.exports = function(app, db){
		app.post("/zeraViews", function(req, res){
			db.collection("paginas").update({}, {acessos:0}, {multi:true}, function(err, doc){
				if(err){
					console.log(err)
				}else{
					res.redirect("/dshboard")
				}
			});
	});
};
