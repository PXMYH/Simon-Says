const express = require("express");
var tcom = require("thesaurus-com");

const router = express.Router();

function sayNothing(blah) {
  console.log(blah);
}

function splitSentences(paragraph) {
  console.log(paragraph);

  tokenizer.setEntry(paragraph);
  var sentences = tokenizer.getTokens();

  console.log(sentences);
  return sentences;
}

function splitWords(sentence) {
  console.log(sentence);

  tokenizer.setEntry(sentence);
  var words = tokenizer.getTokens();

  console.log(words);
  return words;
}

function findThesaurus(word) {
  console.log(word);
  thesaurusList = tcom.search(word)["synonyms"];
  console.log("Thesaurus List" + thesaurusList);
  // use the first one
  thesaurusList = "test"

function convertParagraph(paragraph) {
  console.log(paragraph);
  var sentences = splitSentences(paragraph);
  var words = splitWords(sentences);
  words.forEach(findThesaurus(element));
}

router.get("/", (req, res) => {
  res.render("form", { title: "Registration form" });
});

router.post("/", (req, res) => {
  sayNothing(req.body);
  res.render("form", { title: "Registration form" });
});

module.exports = router;
