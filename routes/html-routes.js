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

router.get("/fashion", (req, res) => {
  db.Article.find({ category: "Fashion" })
    .then(dbArticle => {
      res.render("index", { articles: dbArticle });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/shopping", (req, res) => {
  db.Article.find({ category: "Shopping" })
    .then(dbArticle => {
      res.render("index", { articles: dbArticle });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/celebrity-style", (req, res) => {
  db.Article.find({ category: "Celebrity Style" })
    .then(dbArticle => {
      res.render("index", { articles: dbArticle });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/trends", (req, res) => {
  db.Article.find({
    category: { $in: ["Trends", "Runway", "Street Style"] }
  })
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
