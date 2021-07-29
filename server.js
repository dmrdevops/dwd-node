require("dotenv").config();
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const certs = require("./refs/certList");
const projects = require("./refs/projectsList");

const app = express();

//(2) Parse incoming POST requests
//Parse URL encoded POST and add their values into a body object on the request
app.use(express.urlencoded({ extended: true }));
//Parse incoming request bodies with content type json headers
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//! REMOVE BEFORE PRODUCTION  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* app.use("/", express.static(__dirname + "/public")); */
//! REMOVE BEFORE PRODUCTION  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const pugData = {
  projects: projects.module,
  certs: certs.module,
};

app.get("/", (req, res) => {
  res.render("index", { pugData });
});


// TODO Look into this
/* console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  console.log('development')
}
if (process.env.NODE_ENV === "production") {
  console.log('production')
}
if(['production', 'staging'].indexOf(process.env.NODE_ENV) >= 0) {
  console.log('staging')
} */

// TODO Create actual 404 page and see if I can limit compared to nginx
app.get("*", (req, res, next) => {
  res.status(200).send("Page not found11");
  next();
});

//TODO Do I need it listening on port 8080?
app.listen(8080, () => console.log("\\\\🟢 Listening on port 8080"));

module.exports = app;
