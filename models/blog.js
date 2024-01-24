const mongoose = require("mongoose"); // import mongoose

const BlogSchema = mongoose.Schema; // create a schema which is the method of mongoose

// creat Blog schema
const Blog = new BlogSchema({
  title: {
    type: String, // type of data title is string
    required: true, // which is required and must have a value
    validate: {
      // validate has custom validator method to check the title
      validator: (titleText) => titleText.trim().length > 0,
      message: "{VALUE} should be provided", // error message unless to be sent
    },
  },
  blogContent: {
    // we define here the content of the blog
    type: String, // which has a type of data String
    required: [true, "Please type some text"], // is required and must have a value
  },
  createdAt: {
    // is to indicate when the blog was created
    type: Date, // type has Date
    default: () => Date.now(), // it will return actuall date by default
  },
  updatedAt: {
    // in case the cretated blog is updated, this will show the date of uts update
    type: Date, // Date type
    default: () => Date.now(), // returns actual date of update by default
  },
  createdBy: {
    // this field shows the author of the blog
    type: mongoose.SchemaTypes.ObjectId, // type is the ObjectId
    ref: "User", // which refereces to User model-schema
    required: [true, "user is required"], // this field is required and must have a value
  },
  // likes is an array of objects
  likes: [
    {
      user: {
        // which has user obj
        type: mongoose.SchemaTypes.ObjectId, // type is ObjecId
        ref: "User", //and is reference to User model
      },
    },
  ],
  blogImage: {
    type: String,
  },
});

// export blog model
module.exports = mongoose.model("Blog", Blog);
