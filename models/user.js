const mongoose = require("mongoose");

const UserSchema = mongoose.Schema;

const User = new UserSchema({
  userName: {
    type: String,
    unique: [true, 'User with such username already exists'],
    required: [true, "Please provide user name"],
  },
  email: {
    type: String,
    required: [true, "Please provide correct email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: "{VALUE} is not valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide correct password"],
  },
  role: {
    type: String,
    enum: ["admin", "subscriber"],
    required: [true, 'choose one of the options'],
  },
});

module.exports = mongoose.model("User", User);
