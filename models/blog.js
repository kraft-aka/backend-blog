const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema;

const Blog = new BlogSchema({
  title: {
    type: String,
    required: true,
    unique: [true, "Such blog title exists"],
    validate: {
      validator: (titleText) => titleText.trim().length > 0,
      message: '{VALUE} should be provided'
    },
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
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },

  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  // comments: [{
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Comment',
  // }]
});

module.exports = mongoose.model("Blog", Blog);
