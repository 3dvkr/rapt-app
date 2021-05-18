const Timer = require("../models/Timer");

module.exports = {
  workSession: (req, res) => {
    // console.log("main timer route works");
    // res.send("timer route")
    res.render("workSession");
  },
  postWorkSession: (req, res) => {
      Timer.create({
          user: req.user.id,
          sessionType: req.body.sessionType,
          duration: req.body.duration,
          memo: req.body.memo
      });
      res.redirect('/workSession');
  }
};
