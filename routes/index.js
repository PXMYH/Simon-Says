const express = require("express");
const path = require("path");
const auth = require("http-auth");
const { body, validationResult } = require("express-validator/check");

var thesaurus = require("thesaurus-synonyms");

var natural = require("natural");
var tokenizer = new natural.WordTokenizer();

const router = express.Router();

const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd")
});

function sayNothing(blah) {
  console.log(blah);
}

function splitSentences(paragraph) {
  console.log(paragraph);

  sentences = tokenizer.tokenize(paragraph);
  console.log(sentences);

  return sentences;
}

function splitWords(sentence) {
  console.log(sentence);

  words = tokenizer.tokenize(sentence);
  console.log(words);
  return words;
}

async function findThesaurus(word) {
  console.log("finding thesaurus for word: " + word);

  // use cortical.io, as of Mar 22, 2019 10:20pm Thesaurus.com API is not responding
  // with any results
  // very intellegent algorithm, ALWAYS use the first word returned :)

  var response = await thesaurus.similar(word).then(function(result) {
    return result[0];
  });

  return response;
}

function sanitizeParagragh(json) {
  value = json["paragraph"];
  var content = JSON.stringify(value);
  return content;
}

async function convertParagraph(input) {
  console.log(input);
  var sanitizedParagraph = sanitizeParagragh(paragraph);
  var words = splitWords(sanitizedParagraph);
  var kidParagraph = "";
  for (const word of words) {
    translatedWord = await findThesaurus(word);
    kidParagraph += " " + translatedWord;
  }
  console.log("converted insights = " + kidParagraph);
  return kidParagraph;
}

// temporarily disable authentication due to Heroku https
// router.get("/", auth.connect(basic), (req, res) => {
//   res.render("form", { title: "translation form" });
// });

router.get("/", (req, res) => {
  res.render("form", { title: "translation form" });
});

router.post(
  "/",
  [
    body("paragraph")
      .isLength({ min: 1 })
      .withMessage("Please enter at least a word")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      var wisdom = convertParagraph(req.body);

      // put insights data
      req.body["insights"] = "Sample Response";
      console.log("insights received = " + req.body["insights"]);
      var response_data = req.body;
      console.log("Final response data: " + response_data);

      res.render("form", {
        title: "translation form",
        errors: errors.array(),
        data: response_data
      });
      // res.send("Thank you for your contribution!");
    } else {
      res.render("form", {
        title: "translation form",
        errors: errors.array(),
        data: req.body
      });
    }
  }
);

module.exports = router;
