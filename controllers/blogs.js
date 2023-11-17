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
    const blog = await Blog.find({});
    if (!blog) {
      return res.status(404).send({ msg: "Blogs not found" });
    } else {
      return res.status(200).send({
        msg: "Blogs are found",
        blog: {
          title: req.body.title,
          blogContent: req.body.blogContent,
          createdBy: req.body.createdBy,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error });
  }
}

// gets one blog
async function oneBlog(req, res) {
  try {
    const blog = await Blog.findOne({
      title: req.body.title,
    });
    if (!blog) {
      return res.status(404).send({ msg: 'Such blog was not found' })
    } else {
      return res.status(200).send({ msg: 'Blog is found' , 
    blog : {
      title: req.body.title,
      blogContent: req.body/blogContent,
      createdBy: req.body.createdBy,
    }})
    }
  } catch(error) {
    res.status(500).send({ msg: "Something went wrong", error });
  }
}


module.exports = { newBlog, allBlogs, oneBlog }
