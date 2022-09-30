module.exports = auth = (req, res, next) =>{

    if(!req.user){
        // var err = new Error("You are not athenticated");
        // res.setHeader('WWW-Authenticate', 'Basic');
        // err.status = 403;
        // next(err);
        res.redirect('/');

    }else{
        next();
    }
};

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());