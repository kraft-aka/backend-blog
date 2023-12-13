const mongoose = require("mongoose"); //import mongoose

const UserSchema = mongoose.Schema; // create user schema using mongoose schema method

const User = new UserSchema({
  // create a User with Userschema with fields
  userName: {
    // username is a field
    type: String, // which is a type of String
    unique: [true, "User with such username already exists"], // and must be unique in the collection
    required: [true, "Please provide user name"], // is required and must have a value
  },
  email: {
    // is a field
    type: String, // which is a type of String
    required: [true, "Please provide correct email"], // is required and maust have a value
    unique: [true, "Email already exists"], // must be unique in the collection
    lowercase: true, //must be in lowercase
    trim: true, // must have no spaces
    validate: {
      //validator
      validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // with custom validaitor method
      message: "{VALUE} is not valid email", // error message which will be schown if validation fails
    },
  },
  password: {
    //password field
    type: String, // type of String
    required: [true, "Please provide correct password"], // is required and must have a value
  },
});

// export user model
module.exports = mongoose.model("User", User);
