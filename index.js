const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

try {
  mongoose.connect(process.env.DB_URL, {});
  console.log('DB connceted.')
} catch(error) {
  console.log(error)
}



// parse the json data and provide the obj to any router
app.use(express.json());

// parse url encoded form and send to any router
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8000, ()=> { console.log('server started.')} );

