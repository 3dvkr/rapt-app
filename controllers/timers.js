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
  getTodaysTimers: (req, res) => {
    const todaysTimers = [
      {
        user: 1234567,
        sessionType: "break",
        duration: 5,
        memo: "",
        createdAt: "2021-05-19T12:14:06.221Z",
      },
      {
        user: 1234567,
        sessionType: "work",
        duration: 30,
        memo: "",
        createdAt: "2021-05-19T12:19:06.221Z",
      },
      {
        user: 1234567,
        sessionType: "break",
        duration: 5,
        memo: "",
        createdAt: "2021-05-19T12:54:06.221Z",
      },
    ];
    res.render('today.ejs', {todaysTimers})
    // res.send('testing from today')
  },
};
