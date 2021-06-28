const Timer = require("../models/Timer");
const dayjs = require("dayjs");

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
    res.redirect("/main");
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
  getHistory: async (req, res) => {
    try {
      let history = await Timer.find({
        user: req.user.id,
      });
      history = history.sort((a, b) => b.createdAt - a.createdAt);

      let data = history
        .filter((el) => typeof el.memo == "string" && el.memo.length > 0)
        .map((el) => {
          return { memo: el.memo, duration: el.duration };
        })
        .reduce((acc, val) => {
          if (!acc.some((el) => el.memo.includes(val.memo))) {
            acc.push(val);
          } else {
            acc[acc.indexOf(acc.find((el) => el.memo == val.memo))].duration +=
              val.duration;
          }
          return acc;
        }, [])
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5);
        // console.log(data)
      res.render("history", { history, data });
    } catch (err) {
      console.log(err);
    }
  },
  updateWorkSession: async (req, res) => {
    try {
      const timer = await Timer.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      // console.log("PATCH ATTEMPT", req.body.memo, req.body.duration);

      if (req.body.memo) {
        timer.memo = req.body.memo;
      }

      if (req.body.duration) {
        timer.duration = req.body.duration;
      }

      await timer.save();
      res.send(timer);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist." });
    }
  },
  deleteWorkSession: async (req, res) => {
    try {
      await Timer.deleteOne({ _id: req.params.id, user: req.user.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist" });
    }
  },
};
