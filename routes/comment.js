const express = require('express');
const router = express.Router();

const { newComment } = require('../controllers/comment');

const addComment = router.post('/blogs/:id/comment', newComment);


module.exports = { addComment }

