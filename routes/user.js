const express = require('express'); // import express
const router = express.Router(); // create router and save it to const router 

const { signUp, signIn } = require('../controllers/auth');

router.post('/signUp', signUp); // route with url endpoint with POST HTTP method for creating a new user
router.post('/signIn', signIn); // route with url endpoint with POST HTTP method for signing in

// export router 
module.exports = router;
