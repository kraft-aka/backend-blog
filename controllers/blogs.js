const Blog = require("../models/blog");

// creates a new blog
async function newBlog(req, res) {
  const blog = new Blog({
    title: req.body.title,
    blogContent: req.body.blogContent,
    createdBy: req.body.createdBy,
  });
  try {
    const createdBlog = await blog.save();
    res.status(200).send({ msg: "Blog created successfully", createdBlog });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error });
  }
}

// gets all blogs
async function allBlogs(req, res) {
  try {
    const blogs = await Blog.find({});
    if (!blogs) {
      return res.status(404).send({ msg: "Blogs not found" });
    } else {
      console.log(blogs);
      return res.status(200).send({
        blogs,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// gets one blog
async function getBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).exec();
    if (!blog) {
      return res.status(404).send({ msg: "Such blog was not found" });
    } else {
      console.log(blog);
      return res.status(200).send({
        msg: "Blog is found",
        blog,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

module.exports = { newBlog, allBlogs, getBlog };
