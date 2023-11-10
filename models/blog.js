const mongoose = require("mongoose");
const UserSchema = require("./user");
const CommentSchema = require("./comment");

const BlogSchema = mongoose.Schema();

const Blog = new BlogSchema({
  title: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
    required: [true, "Please type some text"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  createdBy: UserSchema,

  comment: CommentSchema,
});

module.exports = mongoose.model("Blog", BlogSchema);
