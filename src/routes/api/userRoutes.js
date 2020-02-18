// "use strict"

const debug = require("debug")("let-oss-save-the-world: userRoutes: \n");
const express = require("express");
const router = express.Router();
const UserService = require("../../services/userService");
const UserValidator = require("../../validators/userValidator");
const JWT = require("../../middlewares/jwt");

//! GET all users.
router.get("/users", JWT.verify, async function (req, res) {
  debug("user service", req.params);
  let allUsers = await UserService.findAll();

  if (allUsers && allActiveCompanies)
    return res.status(200).json({
      users: allUsers,
      companies: allActiveCompanies
    });
  else res.status(401).send({ error: true, message: "Unauthorized" });
});

//! Add user.
router.post("/add-user", JWT.verify, async (req, res) => {
  let user = req.body;

  user.scope_companies_full_access = !user.scope_companies;

  try {
    const validationResult = UserValidator.validate(user);
    if (validationResult.error) {
      return res.status(400).json({
        error: true,
        message: validationResult.error.details[0].message
      });
    }
    const userAdded = await UserService.add(user);
    res.status(200).json({ userAdded });
  } catch (err) {
    debug("add user error", err);
    return res.status(400).json({ error: true, message: err });
  }
});

//! Update user.
router.post("/update-user", JWT.verify, async (req, res) => {
  const user = req.body;
  try {
    const validationResult = UserValidator.validate(user, {
      allowUnknown: true
    });
    if (validationResult.error) {
      debug("validationResult.error:", validationResult.error);
      return res.status(400).json({
        error: true,
        message: validationResult.error
      });
    } else {
      const updatedUser = await UserService.updateOneById(user.id, user);
      res.status(200).json({ updatedUser });
    }
  } catch (err) {
    debug("err", err);
    return res.status(400).json({ error: true, message: err });
  }
});

//! Deactivate user.
router.post("/deactivate-user", JWT.verify, async (req, res) => {
  try {
    const deactivatedUser = await UserService.deactivateOneById(req.body.id, req.body.status_active);
    return res.status(200).json({ deactivatedUser });
  } catch (err) {
    return res.status(400).json({ error: true, message: err });
  }
});

//! Delete user.
router.post("/delete-user", JWT.verify, async (req, res) => {
  try {
    const deletedUser = await UserService.deleteOneById(req.body.id);
    res.status(200).json({ deletedUser });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = router;
