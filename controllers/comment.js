const Comment = require("../models/comment");
const Blog = require("../models/blog");

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

module.exports = { newComment };
