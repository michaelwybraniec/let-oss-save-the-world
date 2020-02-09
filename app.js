"use strict"

require("dotenv").config();

const bodyParser = require('body-parser');
const express = require('express');
const OAuthServer = require('express-oauth-server');
const config = require('./config/config.json');
const middlewareError = require('./src/middlewares/errors');
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const cookieConnectMiddleware = require("./middleware/cookieConnect");

const apiRoutes = require("./routes/api/");

const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


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

app.use(middlewareError.notFound);
app.use(middlewareError.errorHandler);

// ==============================================================================
// ================================= APP START ==================================
// ==============================================================================

console.log(chalk.blue(`[Starting let-oss-save-the-world API at ${new Date()}]`));
logger.log('info', '[Starting let-oss-save-the-world ' + new Date() + ']');
app.listen(config.application.port,
    () => console.log(chalk.green(`Identity server is running on port ${config.application.port}`))
);

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

