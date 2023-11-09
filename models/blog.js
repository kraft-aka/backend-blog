const mongoose = require("mongoose");
const UserSchema = require("./user");

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
  },
  updatedAt: {
    type: Date,
  },
  author: {
    type: String,
    type: mongoose.SchemaTypes.UserSchema.ObjectId,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
