const express = require("express");
const router = express.Router();
const debug = require("debug")("cookieConnect");
const AuthService = require("../services/authService");

router.use(async (req, res, next) => {
  let result = await AuthService.isConnected(req);
  if (!result) {
    req.flash("error", "Session expired");
    return res.redirect("/login");
  } else {
    next();
  }
});

module.exports = router;
