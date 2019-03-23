const express = require("express");
var tcom = require("thesaurus-com");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("form", { title: "Registration form" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.render("form", { title: "Registration form" });
});

module.exports = router;
