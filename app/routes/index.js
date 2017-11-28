module.exports = function(app, passport, db){
	app.get("/", function(req, res){
		res.render("./home/index", { message: req.flash('loginMessage') })
	})
}
