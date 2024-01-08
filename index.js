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

// routers
app.use(userRouter); // user routes
app.use(blogRouter); // blog routes
app.use(commentRouter); // comment routes

app.get('/upload', (req,res)=> {
  res.sendFile(__dirname+ '/upload.html')
})

app.post("/upload", function (req, res) {
  let uploadFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadFile = req.files.uploadFile;
  uploadPath = __dirname + "/upload/" + uploadFile.name;
  console.log(uploadFile)

  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv(uploadPath, (err)=> {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

// connection to the app
app.listen(process.env.PORT || 8000, () => {
  console.log("server started.");
});
