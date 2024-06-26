const Comment = require("../models/comment.model");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("commentor");
    if (!comments) {
      res.status(404).send("no comments here");
    }
    res.status(200).send(comments);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const getComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.find({ _id: commentId }).populate("commentor");
    if (!comment) {
      res.status(404).send("user is not defined...");
    }
    return res.status(200).send(comment);
  } catch (err) {
    res.json(err);
  }
};

const sendComment = async (req, res) => {
  try {
    const { to, comment, commentor, rating } = req.body;
    const newComment = await Comment.create({
      to,
      comment,
      commentor,
      rating,
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const editComment = async (req, res) => {
  const id = req.params.id;
  try {
    const { rating, comment } = req.body;
    const edited = await Comment.findByIdAndUpdate(id, {
      rating,
      comment,
    });
    res.status(201).send(edited);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      console.log("nothing to delete");
      res.status(404).send("nothing to delete");
    }
    res.status(202).send(deleted);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getComments,
  getComment,
  sendComment,
  editComment,
  deleteComment,
};
