const express = require("express");
const router = express.Router();
const verifyUser = require('../utils/verifyUser');

const { newBlog, getBlog, allBlogs } = require("../controllers/blogs");

const createBlogRouter = router.post("/newblog",verifyUser, newBlog);
const getAllBlogsRouter = router.get("/blogs", allBlogs);
const getBlogRouter = router.get("/blogs/:id", getBlog);

module.exports = { createBlogRouter, getAllBlogsRouter, getBlogRouter };
