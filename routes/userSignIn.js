const express = require('express');
const router = express.Router();

const { signIn } = require('../controllers/auth');

router.post('/signIn', signIn);

module.exports = router;