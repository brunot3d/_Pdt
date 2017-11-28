var LocalStrategy   = require('passport-local').Strategy;
var User = require('./user');

module.exports = function(passport, mongoose) {
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  })
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      })
  })
  ///////////////////////  [ SIGNUP ]  //////////////////////
  passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        process.nextTick(function() {
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err)
            if (user) {
                return done(null, false, req.flash('signupMessage', 'Usuário já cadastrado'))
            } else {
                var newUser = new User()
                newUser.username = username
                newUser.password = newUser.generateHash(password)
                newUser.save(function(err) {
                    if (err)
                        throw err
                    return done(null, newUser)
                })
            }
        })
        })
    }))
    ///////////////////////  [ LOGIN ]  //////////////////////
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },function(req, username, password, done) {
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado'))
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Senha invalida!'))
            return done(null, user)
        })
    }))
}
