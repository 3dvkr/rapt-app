module.exports = {// exports to routes/main.js
    getTimer: (req, res) => {
      res.render('guest.ejs', {baseUrl: '/timer'})
    }
  };