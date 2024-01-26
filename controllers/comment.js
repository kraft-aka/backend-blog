const Comment = require("../models/comment");

// creates new comment
async function newComment(req, res) {
  const comment = new Comment({
    // creates a new comment with data from req.body
    userId: req.user.id, // userId field
    blogId: req.params.id, // blogId field
    commentText: req.body.commentText, // commentText field
  });
  try {
    const newComment = await comment.save(); // saves the comment
    res
      .status(200) // and sends status 200,success msg and new comment
      .send({ msg: "Comment was successfully created", newComment });
  } catch (error) {
    // Handles any errors that might occur during the save operation
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// gets all comments
async function getAllComments(req, res) {
  try {
    const comments = await Comment.find({}); // finds all comments in db
    if (!comments) {
      // if no comments are found, respond with a 404 status and a msg
      return res.status(404).send({ msg: "There is no comments yet" });
    } else {
      return res.status(200).send(comments); // otherwise returns status 200 and comments
    }
  } catch (error) {
    // If an error occurs during the process, responds with a 500 status and an error msg
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// updates comment
async function editComment(req, res) {
  try {
    const comment = await Comment.findOneAndUpdate(
      // finds one comment based on id and user created it
      { _id: req.params.id, userId: req.user.id }, // comment id and user id
      { commentText: req.body.commentText }, // fields to edit
      { new: true } // send new version
    );
    if (!comment) {
      // If no comment is found, responds with a 500 status and an error msg
      res.status(500).send({ msg: "Error occured" });
    } else {
      return res.status(200).send({ comment }); // if comment was successfully updated, sends res status 200 and updated comment
    }
  } catch (error) {
    // If an error occurs during the update process, respond with a 500 status and an error msg
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// deletes comment
async function deleteComment(req, res) {
  try {
    const comment = await Comment.findOneAndDelete({
      // finds one comment and deletes it
      _id: req.params.id, // based on comment id
      userId: req.user.id, // and user who created it
    });
    if (!comment) {
      // if no comment is found, responds with a 404 status and a "No such comment" msg
      res.status(404).send({ msg: "No such comment" });
    } else {
      res.status(200).send({ msg: "Comment was successfully removed" }); // If the comment was successfully deleted, responds with a 200 status and a success msg
    }
  } catch (error) {
    // if an error occurs during the deletion process, responds with a 500 status and an error msg
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// adds like to a comment
async function addLiketoComment(req, res) {
  try {
    const comment = await Comment.findOne({ _id: req.params.id }); // finds a comment based on its id

    if (!comment) {
      // if no comment is found, responds with a 400 status and a "There is no such comment" msg
      res.status(400).send({ msg: "There is no such comment" });
    } else {
      if (
        // checks if the user has already liked the comment
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this comment" });
      }

      comment.likes.unshift({ user: req.user.id }); // if not, it adds a like to the comment

      await comment.save(); // and saves it
      return res.status(200).send({ msg: "Like added" }); // responds with re status 200, and msg
    }
  } catch (error) {
    // if an error occurs during the process, responds with a 500 status and an error msg
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// removes like from comment
async function removeLikeFromComment(req, res) {
  try {
    const comment = await Comment.findOne({
      // finds one comment
      _id: req.params.id, // by id
    });
    if (!comment) {
      // if no comment is found, responds with a 400 status and a "There is no such comment" msg
      return res.status(404).send({ msg: "Comment is not found" });
    } else {
      if (
        // Checks if the user has added a like to the comment
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        const idx = comment.likes.findIndex(
          // Finds the index of the like in the likes array
          (item) => item.user.toString() === req.user.id
        );
        comment.likes.splice(idx, 1); // removes like from the likes array
        await comment.save(); // saves the updated comment
        return res.status(200).send({ msg: "Like removed" }); // retuens res status 200 with msg
      }
      return res
        .status(400) // if not, sends res status 400 with msg
        .json({ msg: "User did not add like to this comment" });
    }
  } catch (error) {
    // if an error occurs during the process, responds with a 400 status and an error message
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// adds reply to a comment
async function addReply(req, res) {
  try {
    const { commentId } = req.params; //  extracts parameters and data from the request
    // const user = req.user.id;
    const replyText = req.body.replyText;

    const comment = await Comment.findById(commentId); // Finds the parent comment by its id
    if (!comment) {
      // if the parent comment is not found, responds with a 404 status and a message
      return res.status(404).send({ msg: "Comment for this blog not found!" });
    }
    const newComment = new Comment({
      // Creates a new Comment for the reply
      userId: req.user.id,
      blogId: comment.blogId,
      commentText: req.body.replyText,
      isReply: true,
    });
    const reply = await newComment.save(); // and saves the reply
    if (!reply) {
      // If the reply is not saved, responds with a 400 status and a message
      return res.status(400).send({ msg: "Failed to reply" });
    }
    comment.replies.push({ commentId: reply.id }); // updates the parent comment's replies array with the id of the new reply
    const savedComment = await comment.save(); // saves it

    return res // sends res status 200, success msg, and comment with reply
      .status(200)
      .send({
        msg: `Reply to ${commentId} was successfully created.`,
        savedComment,
      });
  } catch (error) {
    // if an error occurs during the process, responds with a 500 status and an error message
    res.status(500).send({ msg: "Error occured", error: error.message });
  }
}

module.exports = {
  newComment,
  getAllComments,
  editComment,
  deleteComment,
  addLiketoComment,
  removeLikeFromComment,
  addReply,
};
