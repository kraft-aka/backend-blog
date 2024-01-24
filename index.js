const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");

require("dotenv").config();
const app = express();

// connection to the mongoDb
try {
  mongoose.connect(process.env.DB_URL, {});
  console.log("DB connceted.");
} catch (error) {
  console.log(error);
}

// parse the json data and provide the obj to any router
app.use(express.json());

// parse url encoded form and send to any router
app.use(express.urlencoded({ extended: true }));

// defualt options for file uploading
app.use(fileUpload());
app.use("/upload", express.static("upload"));

// routers
app.use(userRouter); // user routes
app.use(blogRouter); // blog routes
app.use(commentRouter); // comment routes

// connection to the app
app.listen(process.env.PORT || 8000, () => {
  console.log("server started.");
});
