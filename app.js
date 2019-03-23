const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

// render html views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// parse content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
app.use("/", routes);

// static content
app.use(express.static("public"));

module.exports = app;
