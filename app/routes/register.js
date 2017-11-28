module.exports = function(app, passport){

	app.get("/register", function(req, res){
		res.render("./register/register",{ message: req.flash('signupMessage') });
	});
}
