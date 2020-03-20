const router = require("express").Router();

const User = require('../models/user-model');

router.post("/login", (req, res) => {
  User.find({email: req.body.email, password: req.body.password}, (err, data) => {
    res.send(data.length === 1);
  });
});

router.post("/signup", (req, res) => {
  new User(req.body).save().then(newUser => {
    console.log("new user created: " + newUser);
  });
});

module.exports = router;
