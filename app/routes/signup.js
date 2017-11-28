module.exports = function(app, passport){
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/register',
        badRequestMessage: 'Your message you want to change.',
        failureFlash : true
    }));
}
