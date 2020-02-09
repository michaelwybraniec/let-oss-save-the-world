"use strict";

//! To init first user use:
//! DEBUG=happy:* node scripts/initUser.js

// dotenv configuration
require("dotenv").config();
const debug = require("debug")("let-oss-save-the-world: initUser: \n");
const UserDAO = require("../daos/userDAO");
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const user = {
  email: "admin@fatcat.com",
  password: "123456",
  first_name: "Happy",
  last_name: "Admin",
  roles: ["Admin", "User"],
  status_active: true
};

const initUser = async () => {
  try {
    await UserDAO.add(user);
    debug(
      "\x1b[33m\x1b[1mFirst happy user added! :-)",
      "\x1b[0m\x1b[37m Login:",
      user.email,
      " Password:",
      user.password,
      "\x1b[0m"
    );
  } catch (err) {
    debug("\x1b[33m\x1b[1m", err, " \x1b[0m");
  }
};

initUser()
  .then(() => mongoose.connection.close())
  .catch(e => debug(e));
