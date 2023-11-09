const mongoose = require("mongoose");

const UserSchema = mongoose.Schema();

const User = new UserSchema({
  userName: {
    type: String,
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
    },
    message: "{VALUE} is not valid email",
  },
  password: {
    type: String,
    required: [true, "Please provide correct password"],
    trim: true,
    lowercase: false,
    validate: {
      validator: (pw) =>
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pw),
    },
    message: "{VALUE} is not correct",
  },
  role: {
    type: String,
    roleType: ["admin", "subscriber"],
  },
});

module.exports = mongoose.model("User", UserSchema);
