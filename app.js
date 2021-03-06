"use strict";

require("dotenv").config();

const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const OAuthServer = require("express-oauth-server");
const config = require("./config/config.json");
const middlewareError = require("./src/middlewares/errors");
const createError = require("http-errors");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const homeRoutes = require("./src/routes/home");
const apiRoutes = require("./src/routes/api/");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(cors()); //! accept ALL external requests...

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);
app.use("/api", apiRoutes);
//app.use("/", staticRoutes);

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

app.use(middlewareError.notFound);
app.use(middlewareError.errorHandler);

// ==============================================================================
// ================================= APP START ==================================
// ==============================================================================

console.log(chalk.blue(`[Starting let-oss-save-the-world API at ${new Date()}]`));
logger("info", "[Starting let-oss-save-the-world " + new Date() + "]");
const port = process.env.PORT ? process.env.PORT : config.application.port;
app.listen(port, () => console.log(chalk.green(`Identity server is running on port ${port}`)));

module.exports = app;

//var app = express();
//var cors = require('cors'); //? : remove me in production

// When using CORS, one has to expose headers for the FE to receive
//app.use(cors({ exposedHeaders: ['jwtToken'] })); //? : remove me in production

//app.oauth = new OAuthServer({
// app.oauth has the following methods:  'authenticate', 'authorize', 'constructor', 'token'.
//   model: memoryStore, // See https://github.com/oauthjs/node-oauth2-server for specification
//});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//var requestTime = function (req, res, next) {
//   req.requestTime = Date.now();
//   next();
//};

//app.use(requestTime);
