require('dotenv').config();
const express = require("express");
const favicon = require('serve-favicon')
const path = require('path')

const certs = require('./certList')
const projects = require('./projectsList');


const app = express();

//(2) Parse incoming POST requests
//Parse URL encoded POST and add their values into a body object on the request
app.use(express.urlencoded({ extended: true }));
//Parse incoming request bodies with content type json headers
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



//REMOVE BEFORE PRODUCTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use('/', express.static(__dirname + "/public"));

const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '/public'));
//Doesn't work...
//liveReloadServer.watch(path.join(__dirname, '/projects/microCenter/public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const pugData = { 
  projects: projects.module,
  certs: certs.module
}

app.get("/", (req, res) => {
  res.render("index", { pugData });
});



//Sub App routing
//Conditional requiring based on if app is present in folder structure. Better way to do this?
if(Object.keys(require('./projects/microCenter/microcenter')).length === 0) {
  app.get('/projects/microcenter', (req, res) => {
    res.send('Microcenter is currently under maintenance!')
  })
} else {
  const microcenter = require('./projects/microCenter/microcenter');
  app.use('/projects/microcenter', microcenter);
}
//////////////////////////////////////////////////////////////////////////////////////////////
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


app.get("*", (req, res, next) => {
  res.status(200).send("Page not found11");
  next();
});

app.listen(8080, () =>
  console.log('\\\\🟢 Listening on port 8080')
);

module.exports = app;