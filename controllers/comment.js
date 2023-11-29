const Comment = require("../models/comment");
const Blog = require("../models/blog");

// creates new comment
async function newComment(req, res) {
  console.log(req.params)
  const comment = new Comment({
    userId: req.user.id,
    blogId: req.params.id,
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
    const comment = await Comment.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { commentText: req.body.commentText }, { new: true });
    if (!comment) {
      res.status(500).send({ msg: 'Error occured' })
    } else {
      return res.status(200).send({ comment })
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// deletes comment
async function deleteComment(req, res) {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!comment) {
      res.status(404).send({ msg: 'No such comment' })
    } else {
      res.status(200).send({ msg: 'Comment was successfully removed' })
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// adds like to a comment
async function addLiketoComment(req, res) {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
  
    if (!comment) {
      res.status(400).send({ msg: 'There is no such comment' })
    } else {
      if (
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this comment" });
      }

      comment.likes.unshift({ user: req.user.id });

      await comment.save();
      return res.status(200).send({ msg: "Like added" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// removes like from comment
async function removeLikeFromComment(req, res) {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
    });
    if (!comment) {
      return res.status(404).send({ msg: "Blog is not found" });
    } else {
      if (
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        const idx = comment.likes.findIndex(item => item.user.toString() === req.user.id);
        comment.likes.splice(idx, 1);
        await comment.save();
        return res.status(200).send({ msg: "Like removed" });
      }
      return res.status(400).json({ msg: "User did not add like to this comment" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

module.exports = { newComment, getAllComments, editComment, deleteComment, addLiketoComment, removeLikeFromComment };
