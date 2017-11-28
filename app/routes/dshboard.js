module.exports = function(app, db){

	app.get('/dshboard', loginCheck, function(req, res) {
		db.collection("paginas").find({}).toArray(function(err, results) {
			if(err) return
				 res.render("./dshboard/dshboard", {paginas: results, user : req.user})
			});
    });
};
function loginCheck(req, res, next) {
    if (req.isAuthenticated())
        return next();
  res.redirect('/');
}
