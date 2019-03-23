const express = require("express");
const path = require("path");
const auth = require("http-auth");

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
  console.log(word);

  // use cortical.io, as of Mar 22, 2019 10:20pm Thesaurus.com API is not responding
  // with any results
  // very intellegent algorithm, ALWAYS use the first word returned :)

  var response = await thesaurus.similar(word).then(function(result) {
    return result[0];
  });

  return response;
}

function sanitizeParagragh(json) {
  value = json["name"];
  var content = JSON.stringify(value);
  return content;
}

async function convertParagraph(paragraph) {
  console.log(paragraph);
  var sanitizedParagraph = sanitizeParagragh(paragraph);
  var words = splitWords(sanitizedParagraph);
  var kidParagraph = "";
  for (const word of words) {
    translatedWord = await findThesaurus(word);
    kidParagraph += " " + translatedWord;
  }
  console.log("final converted paragraph = " + kidParagraph);
}

router.get("/", auth.connect(basic), (req, res) => {
  res.render("form", { title: "Registration form" });
});

router.post("/", (req, res) => {
  convertParagraph(req.body);
  res.render("form", { title: "Registration form" });
});

module.exports = router;
