const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: {
    required: true,
    type: String,
  },
  commentor: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rating: {
    type: Number,
    minlength: 1,
    maxlength: 5,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
