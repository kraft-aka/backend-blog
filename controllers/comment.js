const Comment = require("../models/comment");
const Blog = require("../models/blog");

// creates new comment
async function newComment(req, res) {
  console.log(req.params)
  const comment = new Comment({
    userId: req.user.id,
    blogId: req.params.blogId,
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
    console.log(comment)
    const comment = await Comment.findByIdAndUpdate(req.user.id, req.params.blogId,{ commentText: req.body.commentText }, { new: true });
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
