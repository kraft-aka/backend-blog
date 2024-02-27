const express = require("express"); //import express
const router = express.Router(); // and create router by using expresses method Router
const verifyUser = require("../utils/verifyUser"); // import middlware verifyUser for protecting the private routes

const {
  newBlog,
  getBlog,
  allBlogs,
  deleteBlog,
  editBlog,
  addLike,
  removeLike,
  addImage,
  deleteImage,
  likesFromBlogs,
} = require("../controllers/blogs");

// routers
router.post("/newblog", verifyUser, newBlog); // privat router with url endpoint, with HTTP POST method for creating new blog
router.get("/blogs", allBlogs); // public router with url endpoint, GET HHTP method for fetching all blogs
router.get("/blogs/:id", getBlog); // public router with url endpoint, GET HHTP method for fetching one particuilar blog by id
router.delete("/blogs/deleteblog/:id", verifyUser, deleteBlog); // privat router with url endpoint, DELETE HHTP method for deleteing one blog
router.put("/blogs/:id", verifyUser, editBlog); // privat router with url endpoint, PUT HHTP method for updating a blog
router.put("/blogs/likes/:id", verifyUser, addLike); // privat router with url endpoint, PUT HHTP method for adding like to a blog
router.delete("/blogs/deletelike/:id", verifyUser, removeLike); // privat router with url endpoint, DELETE HHTP method for deleting a blog
router.post('/blogs/addImage/:id', verifyUser, addImage);
router.delete('/blogs/deleteImage/:id', verifyUser, deleteImage);
router.get('/likes',verifyUser,likesFromBlogs);

// export the router
module.exports = router;
