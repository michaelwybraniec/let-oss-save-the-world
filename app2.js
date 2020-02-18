"use strict";

// dotenv configuration
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");

const apiRoutes = require("./routes/api/");
const staticRoutes = require("./routes/static/");

const { isNotEqual, easyFormInput, activeOrNotActiveStatus, today, formatDate, ifEquals } = require("./misc/helpers");

const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("json", context => {
  return JSON.stringify(context);
});
hbs.registerHelper("activeStatus", activeOrNotActiveStatus);
hbs.registerHelper("easyFormInput", easyFormInput);
hbs.registerHelper("isNotEqual", isNotEqual);
hbs.registerHelper("today", today);
hbs.registerHelper("formatDate", formatDate);
hbs.registerHelper("round", n => n.toFixed(2));
hbs.registerHelper("roundLong", n => n.toFixed(6));
hbs.registerHelper("ifEquals", ifEquals);

const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Use session for admin login
app.use(
  session({
    secret: "admin  secret",
    resave: true,
    cookie: { maxAge: 86400000 }, //24 hours
    saveUninitialized: false,
    store: new MongoStore({ url: process.env.MONGODB_URI })
  })
);

app.use(cors()); //! accept ALL external requests...

app.use(flash());

app.use(logger("dev"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("/", staticRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("Happy Backend Started");

module.exports = app;
