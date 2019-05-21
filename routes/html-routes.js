const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../models");

router.use(function timeLog(req, res, next) {
  //   console.log("INSIDE HTML ROUTES");
  next();
});

router.get("/", (req, res) => {
  db.Article.find({})
    .then(dbArticle => {
      res.render("index", { articles: dbArticle });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/comments", (req, res) => {
  res.render("comments");
});

module.exports = router;
