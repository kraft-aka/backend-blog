const Blog = require("../models/blog");

// creates a new blog
async function newBlog(req, res) {
  console.log(req.user.id)
  const blog = new Blog({
    createdBy: req.user.id,
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

// deletes particular blog
async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findOneAndDelete({ 'createdBy': req.user.createdBy, '_id': req.blog.id }).exec();
    if (!blog) {
      return res.status(400).send({ msg: 'Blog not found' })
    } else {
      return res.status(200).send({ msg: 'Blog was deleted' })
    }
  } catch (error) {
    res.status(400).send({ msg: 'Error occured', error: error.message })
  }
}

module.exports = { newBlog, allBlogs, getBlog, deleteBlog };


//TODO: fix deleteBlog 