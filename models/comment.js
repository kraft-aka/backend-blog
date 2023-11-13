const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema();

const Comment = new CommentSchema({
  userName: {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },

  blog: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "blogs",
  },

  commentText: {
    type: String,
    validate: {
      validator: (txt) => txt.trim().length !== 0,
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

module.exports = mongoose.model("Comment", CommentSchema);
