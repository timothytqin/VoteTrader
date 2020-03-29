const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  email: String,
  policy: String,
  date: Number,
  scope: String,
  comment: String,
  tags: Array
});

const Trade = mongoose.model("trade", tradeSchema);

module.exports = Trade;
