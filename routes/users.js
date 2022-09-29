var express = require('express');
var routerUser = express.Router();
var Users = require('../models/userModel');

/* GET users listing. */
routerUser.route('/')
  .get((req, res, next) => {
    Users.find()
      .then((users) => {
        if (users != null) {
          res.json(users);
        } else {
          err = new Error("Users collection is empty or not found");
          next(err);
        }
      },
        err => next(err)
          .catch(err => next(err)))
  })


module.exports = routerUser;
