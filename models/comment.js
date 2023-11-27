const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema;

const Comment = new CommentSchema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, 'Provide user id']
  },

  blogId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Blog",
    required: [true, 'Provide blog id'],
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
  likes: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Comment", Comment);
