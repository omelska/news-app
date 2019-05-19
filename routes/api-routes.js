const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

router.use((req, res, next) => {
  console.log("INSIDE API ROUTES");
  next();
});

router.get("/scrape", (req, res) => {
  axios.get("https://www.vogue.com/fashion").then(response => {
    const $ = cheerio.load(response.data);
    let result = {};
    $("li.four-story--item").each(element => {
      result.imageURL = $(element)
        .find("img")
        .attr("srcset");
      result.headline = $(element)
        .find("h3.four-story--title")
        .text();
      result.link = $(element)
        .find("a.four-story--link")
        .attr("href");

      db.Article.create(result)
        .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // $(".feed-card--container").each(element => {
    //   result.imageURL = $(element)
    //     .find("img.collection-list--image")
    //     .attr("srcset");
    //   result.headline = $(element)
    //     .find("h2.feed-card--title a")
    //     .text();
    //   result.link = $(element)
    //     .find("h2.feed-card--title")
    //     .children()
    //     .attr("href");
    //   console.log(result);
    // });
  });
  res.send("sucess");
});

router.get("/articles", (req, res) => {
  db.Article.find({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/articles/:id", (req, res) => {
  db.Comments.create(req.body).then(comment => {
    return db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comment: comment._id } },
      { new: true }
    )
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

router.get("/comments", (req, res) => {
  db.Comments.find()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;