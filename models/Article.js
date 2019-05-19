const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  imageURL: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },
  // `comment` is an object that stores a Comments id
  // The ref property links the ObjectId to the Comments model
  // This allows us to populate the Article with an associated Comment
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
