// module.exports = auth = (req, res, next) =>{
//     var authHeader = req.headers.authorization;

//     if(!authHeader){
//         var err = new Error("You are not athenticated");
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         next(err);
//     }else{
//         var auth = new Buffer.from(authHeader.split(' ')[1], 'Base64').toString().split(':');
//         var username = auth[0];
//         var password = auth[1];

//         if(username === "anis" && password === "my pass"){
//             next();
//         }else{
//             var err = new Error("username or password incorrect");
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             next(err);
//         }
//     }
// };


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