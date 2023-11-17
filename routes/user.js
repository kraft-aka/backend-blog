const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/auth');

const signUpRouter = router.post('/signUp', signUp);
const signInRouter = router.post('/signIn', signIn);

module.exports = { signUpRouter, signInRouter };
