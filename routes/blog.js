const express = require("express");
const router = express.Router();
const verifyUser = require("../utils/verifyUser");

const {
  newBlog,
  getBlog,
  allBlogs,
  deleteBlog,
  editBlog,
  addLike,
} = require("../controllers/blogs");

router.post("/newblog", verifyUser, newBlog);
router.get("/blogs", allBlogs);
router.get("/blogs/:id", getBlog);
router.delete("/blogs/deleteblog/:id", verifyUser, deleteBlog);
router.put('/blogs/:id', verifyUser, editBlog);
router.put("/blogs/likes/:id", verifyUser, addLike);

module.exports = router;
