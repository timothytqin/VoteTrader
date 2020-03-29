const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const authRoutes = require("./routes/auth-routes");
const tradeRoutes = require("./routes/trade-routes");

const app = express();
app.use(express.json());

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);
app.use("/trade", tradeRoutes);

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
