const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const User = new Schema({ 
  userName: { 
    type: String,
    required: [ true, 'Please provide user name' ]
   },
   email: {
    type: String,
    required: [ true, 'Please provide correct email' ],
    unique: [ true, 'Email already exists'],
    lowercase: true,
    trim: true,
    validate: { 
      validator: (email)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
     },
     message: '{VALUE} is not valid email'
   }
   
 })

