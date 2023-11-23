const Comment = require("../models/comment");
const Blog = require("../models/blog");

// creates new comment
async function newComment(req, res) {
  const comment = new Comment({
    userId: req.body.userId,
    blogId: req.body.blogId,
    commentText: req.body.commentText,
  });
  try {
    const newComment = await comment.save();
    res
      .status(200)
      .send({ msg: "Comment was successfully created", newComment });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// gets all comments
async function getAllComments(req, res) {
  try {
    const comments = await Comment.find({});
    console.log(comments);
    if (!comments) {
      return res.status(404).send({ msg: 'There is no comments yet' })
    } else {
      return res.status(200).send(comments)
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// updates comment
async function editComment(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { commentText: req.body.commentText }, { new: true });
    if (!comment) {
      res.status(500).send({ msg: 'Error occured' })
    } else {
      return res.status(200).send({ comment })
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

module.exports = { newComment, getAllComments, editComment };
