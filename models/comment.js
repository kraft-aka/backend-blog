const mongoose = require("mongoose");
const UserSchema = require("./user");

const CommentSchema = mongoose.Schema();

const Comment = new CommentSchema({
  userName: UserSchema,
  commentText: {
    type: String,
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
