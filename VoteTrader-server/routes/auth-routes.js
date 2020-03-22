const router = require("express").Router();

const User = require('../models/user-model');

router.post("/login", (req, res) => {
  User.find({email: req.body.email, password: req.body.password}, (err, data) => {
    if(data.length > 0) {
      console.log("Logging in: " + JSON.stringify(data));
      res.send(data);
    }
  });
});

router.post("/signup", (req, res) => {
  new User(req.body).save().then(newUser => {
    console.log("User created: " + newUser);
    res.send(newUser);
  });
});

module.exports = router;
