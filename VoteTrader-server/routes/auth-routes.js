const router = require("express").Router();

const passport = require("passport");
const User = require('../models/user-model');

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  new User(req.body).save().then(newUser => {
    console.log("new user created: " + newUser);
  });
  User.find((err, data) => {
    console.log(data);
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile/");
});

module.exports = router;
