const express = require('express');
const mongoose = require('mongoose');
const {signUpRouter, signInRouter} = require('./routes/user');
const newBlog = require('./routes/blog');

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
app.use(newBlog)

app.listen(process.env.PORT || 8000, () => { console.log('server started.') });

