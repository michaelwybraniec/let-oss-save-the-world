"use strict";

const express = require("express");
const router = express.Router();

const authRouter = require("./authRoutes.js");
const userRouter = require("./userRoutes");

//! Register unsecured routes.
router.use("/auth", authRouter);

//! Register secured routes.
router.use("/", userRouter);

module.exports = router;
