const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  phoneNumber: String,
  googleId: String,
  thumbnail: String,
  settings: Object,
  trades: Array
});

const User = mongoose.model("user", userSchema);

module.exports = User;
