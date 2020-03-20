const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  thumbnail: String
});

const NewUser = mongoose.model("user", newUserSchema);

module.exports = NewUser;
