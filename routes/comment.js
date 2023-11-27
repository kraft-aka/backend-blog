const express = require("express");
const router = express.Router();
const verifyUser = require("../utils/verifyUser");

const {
  newComment,
  getAllComments,
  editComment,
  deleteComment,
  addLiketoComment
} = require("../controllers/comment");

router.post("/blogs/comment/:id", verifyUser, newComment);
router.get("/comments", getAllComments);
router.put("/comments/:id", verifyUser, editComment);
router.delete("/comments/deletecomment/:id", verifyUser, deleteComment);
router.put("/comments/addlike/:id", verifyUser, addLiketoComment);

module.exports = router;
