module.exports = function(app, passport){
	app.post('/autenticar', passport.authenticate('local-login', {
	        successRedirect : '/dshboard',
	        failureRedirect : '/',
	        failureFlash : true
	    }));
}
