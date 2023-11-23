const express = require("express");
const router = express.Router();
const verifyUser = require("../utils/verifyUser");

const {
  newComment,
  getAllComments,
  editComment,
} = require("../controllers/comment");

const addComment = router.post("/blogs/:id/comment", newComment);
const getComments = router.get("/comments", getAllComments);
const updateComment = router.put("/comments/:id", editComment);

module.exports = { addComment, getComments, updateComment };
