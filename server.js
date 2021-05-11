const express = require("express");
const pug = require("pug");
const favicon = require('serve-favicon')
const path = require('path')

const certs = require('./certList')
const projects = require('./projectsList');

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(__dirname + "/public"));


const pugData = { 
  projects: projects.module,
  certs: certs.module
}

app.get("/", (req, res) => {
  res.render("index", { pugData });
});

app.get("*", (req, res, next) => {
  res.status(200).send("Page not found");
  next();
});

app.listen(8080, () =>
  console.log('\\\\🟢 Listening on port 8080')
);