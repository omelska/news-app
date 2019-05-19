const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: String,
  username: String,
  comment: String
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
