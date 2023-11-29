const Blog = require("../models/blog");

// creates a new blog
async function newBlog(req, res) {
  console.log(req.user.id);
  const blog = new Blog({
    createdBy: req.user.id,
    title: req.body.title,
    blogContent: req.body.blogContent,
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
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!blog) {
      return res.status(400).send({ msg: "Blog not found" });
    } else {
      return res.status(200).send({ msg: "Blog was deleted" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// update blog
async function editBlog(req, res) {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title: req.body.title, blogContent: req.body.blogContent },
      { new: true }
    );
    if (!blog) {
      return res.status(500).send({ msg: "Error occured" });
    } else {
      return res
        .status(200)
        .send({ msg: "Blog has been successfully updated", blog });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// adding like to a blog
async function addLike(req, res) {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
    });
    if (!blog) {
      return res.status(404).send({ msg: "Blog is not found" });
    } else {
      if (
        blog.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this blog" });
      }

      blog.likes.unshift({ user: req.user.id });

      await blog.save();
      return res.status(200).send({ msg: "Like added" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// removes like from blog
async function removeLike(req, res) {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
    });
    if (!blog) {
      return res.status(404).send({ msg: "Blog is not found" });
    } else {
      if (
        blog.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        const idx = blog.likes.findIndex(item => item.user.toString() === req.user.id);
        blog.likes.splice(idx, 1);
        await blog.save();
        return res.status(200).send({ msg: "Like removed" });
      }
      return res.status(400).json({ msg: "User did not add like to this blog" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

module.exports = { newBlog, allBlogs, getBlog, deleteBlog, editBlog, addLike, removeLike };
