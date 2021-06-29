const express = require("express");
const microcenter = express();
const path = require("path");
const app = require("../../app");

microcenter.set("views", __dirname + "/views");
microcenter.use("/", express.static(__dirname + "/public"));

microcenter.get("/", (req, res) => {
  res.render("index");
});

const timestampRouter = require("./routes/timestamp");
microcenter.use("/timestamp", timestampRouter);

const metadataRouter = require("./routes/metadata");
microcenter.use("/metadata", metadataRouter);

const headerParserRouter = require("./routes/headerParser");
microcenter.use("/whoami", headerParserRouter);

//const urlShortenerRouter = require('./routes/urlShortenerRouter');
//microcenter.use('/urlshortener', urlShortenerRouter);

module.exports = microcenter;
