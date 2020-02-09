const express = require("express");
const router = express.Router();
const debug = require("debug")("let-oss-save-the-world: authRoutes: \n");
const AuthService = require("../../services/authService");

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(401).send({ error: true, message: "Unauthorized" });

  let user = await AuthService.loginAPI(req.body.email, req.body.password);

  if (user) return res.status(200).json({ user });
  else res.status(401).send({ error: true, message: "Unauthorized" });
});

router.get("/logout", async (req, res) => {
  await AuthService.logout(req);
  res.redirect("/login");
});

module.exports = router;
