const Timer = require("../models/Timer");

module.exports = {
  workSession: (req, res) => {
    console.log("main timer route works");
    // res.send("timer route")

    res.render("workSession");
  },
};
