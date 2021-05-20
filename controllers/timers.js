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
      memo: req.body.memo,
    });
    res.redirect("/workSession");
  },
  getTodaysTimers: async (req, res) => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const timersToday = await Timer.find({
        user: req.user.id,
        createdAt: { $gte: today },
      });
      // console.log(today, "getTodaysTimers controller", timersToday);
      res.render("today.ejs", {
        timersToday,
      });
    } catch (err) {
      console.log(err);
    } 
  },
};
