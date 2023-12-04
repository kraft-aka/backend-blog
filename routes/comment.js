const express = require("express");
const router = express.Router();
const verifyUser = require("../utils/verifyUser");

const {
  newComment,
  getAllComments,
  editComment,
  deleteComment,
  addLiketoComment,
  removeLikeFromComment,
  addReply
} = require("../controllers/comment");

router.post("/blogs/comment/:id", verifyUser, newComment);
router.get("/comments", getAllComments);
router.put("/comments/:id", verifyUser, editComment);
router.delete("/comments/deletecomment/:id", verifyUser, deleteComment);
router.put("/comments/addlike/:id", verifyUser, addLiketoComment);
router.delete("/comments/deletelike/:id", verifyUser, removeLikeFromComment);
router.post('/:commentId/addreply', verifyUser, addReply);

module.exports = router;
