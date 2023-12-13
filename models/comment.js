const mongoose = require("mongoose"); // import mongoose

const CommentSchema = mongoose.Schema; // and create schema for comment. Schema is the method of mongoose obj.

// create comment schema and save it to const
const Comment = new CommentSchema({
  userId: {
    // which has userId field
    type: mongoose.SchemaTypes.ObjectId, // is the type of ObjectId
    ref: "User", // and is the reference of User model
    required: [true, "Provide user id"], // this filed is required and must have a value
  },

  blogId: {
    // blogId field
    type: mongoose.SchemaTypes.ObjectId, // is the type of ObjectId
    ref: "Blog", // and is the reference of Blog model
    required: [true, "Provide blog id"], // this filed is required and must have a value
  },

  commentText: {
    // commentText
    type: String, // which has the type of String
    required: true, // is required and must have a value
    validate: {
      // object validation
      validator: (txt) => txt.trim().length !== 0, // validator is custom validation method
      message: "{VALUE} should not be empty", // is the error message, will be displayed in case the validator fails
    },
  },
  createdAt: {
    // createdAt field
    type: Date, // specify the data type of it, which is Date
    default: () => Date.now(), // which has a default method to return a actual date in case date is not provided
  },
  updatedAt: {
    // updatedAt filed
    type: Date, // specify the data type of it, which is Date
    default: () => Date.now(), // which has a default method to return a actual date in case date is not provided
  },
  likes: [
    // likes filed, which is an array of objects
    {
      user: {
        // and object has a single prop 'user'
        type: mongoose.SchemaTypes.ObjectId, // is a special type of ObjectId
        ref: "User", // specifies that this 'user' prop is referencing to User model
      },
    },
  ],
  replies: [
    // replies field which is an array of objects
    {
      // user: {
      //   type: mongoose.SchemaTypes.ObjectId,
      //   ref: 'User',
      // },
      commentId: {
        // and has a single prop commentId
        type: mongoose.SchemaTypes.ObjectId, // has a type of ObjectId,
        required: false, // required is turned to false
      },
      // createdAt: {
      //   type: Date,
      //   default: () => Date.now(),
      // },
      // replyText: {
      //   type: String,
      //   required: true,
      //   validate: {
      //     validator: (txt) => txt.trim().length !== 0,
      //     message: '{VALUE} should not be empty'
      //   },
      // }
    },
  ],
  isReply: {
    // isReply is field ,
    type: Boolean, // with type of Boolean
    default: false, // and default value of it is false. On creation of the doc it will bw false
  },
});

// export the comment model
module.exports = mongoose.model("Comment", Comment);
