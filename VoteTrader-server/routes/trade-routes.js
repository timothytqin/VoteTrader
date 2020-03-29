const router = require("express").Router();

const Trade = require("../models/trade-model");

router.post("/", (req, res) => {
  const currDate = new Date();
  Trade.find(
    {
      date: {
        $gte: new Date(
          currDate.getFullYear(),
          currDate.getMonth(),
          currDate.getDate(),
          0,
          0,
          0,
          0
        ).getTime()
      },
      ...req.body
    },
    (err, data) => {
      console.log("Getting Trades: " + data);
      res.send(data);
    }
  );
});

router.post("/create", (req, res) => {
  new Trade(req.body).save().then(newTrade => {
    console.log("Trade made: " + newTrade);
    // res.send(newTrade);
  });
});

module.exports = router;
