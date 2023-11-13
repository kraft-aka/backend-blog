const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema();

const Blog = new BlogSchema({
  title: {
    type: String,
    required: true,
    unique: [true, "Such blog title exists"],
    validate: {
      validator: (titleText) => titleText.trim().length > 0,
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
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },

  likes: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("Blog", BlogSchema);
