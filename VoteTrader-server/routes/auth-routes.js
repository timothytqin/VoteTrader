const router = require("express").Router();

const User = require("../models/user-model");

router.post("/profile", (req, res) => {
  console.log("Profile model: " + JSON.stringify(req.body));
  User.updateOne({ email: req.body.email }, req.body, (err, data) => {
    console.log("Updating profile: " + JSON.stringify(data));
    // res.send(data);
  });
});

router.post("/login", (req, res) => {
  console.log("Attempting Login by: " + req.body.email);
  User.find(
    { email: req.body.email, password: req.body.password },
    (err, data) => {
      if (data.length > 0) {
        console.log("Logging in: " + JSON.stringify(data));
        res.send(data);
      }
    }
  );
});

router.post("/signup", (req, res) => {
  new User(req.body).save().then(newUser => {
    console.log("User created: " + newUser);
    res.send(newUser);
  });
});

// router.post("/:username", (req, res) => {});

module.exports = router;
