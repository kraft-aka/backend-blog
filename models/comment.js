const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema;

const Comment = new CommentSchema({
  userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
  },

  blogId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Blog",
  },

  commentText: {
    type: String,
    validate: {
      validator: (txt) => txt.trim().length !== 0,
      message: '{VALUE} should not be empty'
    },
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Comment", Comment);
