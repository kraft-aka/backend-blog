const express = require("express");
const router = express.Router();

const { newBlog, getBlog, allBlogs } = require("../controllers/blogs");

const createBlogRouter = router.post("/newblog", newBlog);
const getAllBlogsRouter = router.get('/blogs', allBlogs);
const getBlogRouter = router.get('./blogs/:id', getBlog);

module.exports = { createBlogRouter, getAllBlogsRouter, getBlogRouter };
