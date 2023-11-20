const Comment = require("../models/comment");
const Blog = require("../models/blog");

async function newComment(req, res) {
  const comment = new Comment({
    userId: req.params.userId,
    blogId: req.params.blogId,
    commentText: req.body.commentText,
  });
  try {
    const newComment = await comment.save();
    const blogRelated = await Blog.findById(req.params.id);
     blogRelated.comments.push(newComment);
    //blogRelated.comments.push(comment);
    await blogRelated.save();
    // this should be cleared beacuse it creates to copies of comments
    // await newComment.deleteOne();
    res
      .status(200)
      .send({ msg: "Comment was successfully created", newComment });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

module.exports = { newComment };
