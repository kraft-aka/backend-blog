const express = require("express"); //import express
const router = express.Router(); // and create router by using expresses method Router
const verifyUser = require("../utils/verifyUser"); // import middlware verifyUser for protecting the private routes

const {
  newComment,
  getAllComments,
  editComment,
  deleteComment,
  addLiketoComment,
  removeLikeFromComment,
  addReply,
} = require("../controllers/comment");

// routers
router.post("/blogs/comment/:id", verifyUser, newComment); // privat route with url endpoint, uses POST HTTP method, creates a comment
router.get("/comments", getAllComments); // public route with url endpoint, uses GET HTTP method, fetches all comments
router.put("/comments/:id", verifyUser, editComment); // privat route with url endpoint, uses PUT HTTP method, updates the comment
router.delete("/comments/deletecomment/:id", verifyUser, deleteComment); // privat route with url endpoint, uses DELETE HHTP method, deletes comment
router.put("/comments/addlike/:id", verifyUser, addLiketoComment); // privat route with url endpoint, uses PUT HHTP method, adds like to comment
router.delete("/comments/deletelike/:id", verifyUser, removeLikeFromComment); // privat route with url endpoint, uses DELETE HHTP method, deletes a like from comment
router.post("/:commentId/addreply", verifyUser, addReply); // privat route with url endpoint, uses POST HHTP method, adds reply to a comment

// export router
module.exports = router;
