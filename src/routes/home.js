"use strict";

const express = require("express");
const router = express.Router();

//Simple Home Page
router.get("/", (req, res) => {
  res.send(
    '<html>\
      <head>\
        <title>Let OSS save the world!</title>\
      </head>\
      <body style="text-align:center;padding-top:80px;font-size: 14px;font-family: sans-serif;color: #607d8b;">\
        <br/><br/><br/>\
        <h2 style="color:#4e9a51">Let OSS save the world!</h2>\
        <h3 style="font-style:italic">\
          Open source, eco oriented intelligence over the internet.\
        </h3>\
      </body>\
    </html>'
  );
});

module.exports = router;
