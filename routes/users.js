var express = require('express');
var routerUser = express.Router();
var User = require('../models/userModel');
var passport = require('passport');
const { router } = require('../app');

/* GET users listing. */
routerUser.route('/')
  .get((req, res, next) => {
    User.find()
      .then((users) => {
        if (users != null) {
          res.json(users);
        } else {
          err = new Error("User collection is empty or not found");
          next(err);
        }
      },
        err => next(err)
          .catch(err => next(err)))
  });

routerUser.post('/login', 
                passport.authenticate('local', 
                {successRedirect: '/products', failureRedirect: '/'}),
                (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ Success: true, status: "Successfully authenticated" });
});

routerUser.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    console.log(req.body)
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ Error: err });
    } else {
      passport.authenticate('local')
        (req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ Success: true, status: "Registration Success" });
        })
    }
  })
});
module.exports = routerUser;
