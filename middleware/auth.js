module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/"); // TODO
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/main"); // TODO
      }
    },
  };
  