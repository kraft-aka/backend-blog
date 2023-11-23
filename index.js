const express = require('express');
const mongoose = require('mongoose');
const { signUpRouter, signInRouter } = require('./routes/user');
const { createBlogRouter, getAllBlogsRouter, getBlogRouter, deleteBlogRouter } = require('./routes/blog');
const { addComment } = require('./routes/comment');

require('dotenv').config();
const app = express();

try {
  mongoose.connect(process.env.DB_URL, {});
  console.log('DB connceted.')
} catch (error) {
  console.log(error)
}



// parse the json data and provide the obj to any router
app.use(express.json());

// parse url encoded form and send to any router
app.use(express.urlencoded({ extended: true }));

// routers 
app.use(signUpRouter);
app.use(signInRouter);
app.use(createBlogRouter);
app.use(getAllBlogsRouter);
app.use(getBlogRouter);
app.use(addComment);
app.use(deleteBlogRouter);


app.listen(process.env.PORT || 8000, () => { console.log('server started.') });

