const Blog = require("../models/blog");
const path = require("path");
const fs = require("fs");

// creates a new blog
async function newBlog(req, res) {
  const blog = new Blog({
    // Creates a new Blog instance with data from the request
    createdBy: req.user.id, // createdBy field - user info is stored in req.user
    title: req.body.title, // title field
    blogContent: req.body.blogContent, // blogContent field
  });
  try {
    const createdBlog = await blog.save(); // saves the new blog to the collection
    res.status(200).send({ msg: "Blog created successfully", createdBlog }); // sends res status 200
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error }); // handles error which can occur during creating the new blog
  }
}

// gets all blogs
async function allBlogs(req, res) {
  // gets all blog from the collection
  try {
    const options = {};
    if (req.query.user) {
      options["createdBy"] = req.query.user;
    }

    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);

    page = page ? page : 1;
    limit = limit ? limit : 10;

    //get first and end indexes for the requested page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalBlogs = await Blog.countDocuments(options);

    const blogs = await Blog.find(options)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("createdBy"); // finds all blogs in the collection by find method

    results.pages = Math.ceil(totalBlogs / limit);

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < totalBlogs) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    console.log(results);
    if (!blogs) {
      // if there is no blog in db , it sends res status 404 and  msg
      return res.status(404).send({ msg: "Blogs not found" });
    } else {
      return res.status(200).send({
        // otherwise returns all blogs
        blogs,
        results,
      });
    }
  } catch (error) {
    // handles all errors during the searching process
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// gets one blog
async function getBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy")
      .exec(); // finds a particular blog by id
    if (!blog) {
      // if there is no such blog with provided id, it sends res status 404 and msg
      return res.status(404).send({ msg: "Such blog was not found" });
    } else {
      return res.status(200).send({
        // otherwise it returns res status 200, msg, and a blog
        msg: "Blog is found",
        blog,
      });
    }
  } catch (error) {
    //handles all errors during the search process
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
}

// deletes particular blog
async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findOneAndDelete({
      // finds and deletes one blog based on provided id, and the user created it
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!blog) {
      // If no blog was found, respond with a 400 status and an error msg
      return res.status(400).send({ msg: "Blog not found" });
    } else {
      // otherwise res status 200 and msg will be returned
      return res.status(200).send({ msg: "Blog was deleted" });
    }
  } catch (error) {
    // handles all error during deletion process
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// update blog
async function editBlog(req, res) {
  try {
    const blog = await Blog.findOneAndUpdate(
      // finds and updates a blog
      { _id: req.params.id, createdBy: req.user.id }, // searches the blog by id and user id
      { title: req.body.title, blogContent: req.body.blogContent }, // fields that can be updated
      { new: true } // returns new version of the blog
    );
    if (!blog) {
      // If no blog was found, respond with a 500 status and an error msg
      return res.status(500).send({ msg: "Error occured" });
    } else {
      return res // otherwise res status 200, msg and updated blog are returned
        .status(200)
        .send({ msg: "Blog has been successfully updated", blog });
    }
  } catch (error) {
    //handles all errors during the update process
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// adding like to a blog
async function addLike(req, res) {
  try {
    const blog = await Blog.findOne({
      // finds the blog with provided id and saves is to the const blog
      _id: req.params.id, // id is provided
    });
    if (!blog) {
      // if no such blog with given id found,
      return res.status(404).send({ msg: "Blog is not found" }); // res status 404, and an error msg are sent
    } else {
      if (
        blog.likes.filter((like) => like.user.toString() === req.user.id) // checks if the user alredy liked the blog
          .length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this blog" }); //if user liked it, res status 400, and msg will be sent
      }

      blog.likes.unshift({ user: req.user.id }); // otherwise adds like to the blog

      await blog.save(); // and saves the updated blog
      return res.status(200).send({ msg: "Like added" }); // and sends res status 200 with msg
    }
  } catch (error) {
    // handles all errors, can occur during the process
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

// removes like from blog
async function removeLike(req, res) {
  try {
    const blog = await Blog.findOne({
      // finds the blog with provided id and saves is to the const blog
      _id: req.params.id, // provieded id
    });
    if (!blog) {
      // if no such blog with given id found,
      return res.status(404).send({ msg: "Blog is not found" }); // res status 404, and an error msg are sent
    } else {
      if (
        blog.likes.filter((like) => like.user.toString() === req.user.id) // Checks if the user has added a like to the blog
          .length > 0
      ) {
        const idx = blog.likes.findIndex(
          (item) => item.user.toString() === req.user.id
        ); // Finds the index of the like in the likes array
        blog.likes.splice(idx, 1); // and removes the like from the likes array
        await blog.save(); // finally saves updatedblog
        return res.status(200).send({ msg: "Like removed" }); // and respods with status 200 and msg
      }
      return res
        .status(400)
        .json({ msg: "User did not add like to this blog" }); // if user did not add like to the blog , sends res status 400 and msg
    }
  } catch (error) {
    // handles all errors, can occur during the process
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

async function addImage(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("No files were uploaded.");
    if (Object.keys(req.files).length > 1)
      return res.status(400).send("Only one file will be accepted.");

    const uploadFile = req.files.uploadFile;
    const id = req.params.id;

    if (!uploadFile.mimetype.match("image")) {
      return res.status(400).send({ msg: "Please upload an image" });
    }
    const blog = await Blog.findOne({
      // finds and deletes one blog based on provided id, and the user created it
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!blog) {
      // If no blog was found, respond with a 400 status and an error msg
      return res.status(400).send({ msg: "Blog not found" });
    } else {
      // get file's extension type // jpeg, png, svg
      let fileExtensionName = uploadFile.name.split(".");
      fileExtensionName = fileExtensionName[fileExtensionName.length - 1];

      const uploadPath = path.join(
        __dirname,
        `../upload/${id}.${fileExtensionName}`
      );

      uploadFile.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);
        blog.blogImage = `/upload/${id}.${fileExtensionName}`;

        await blog.save();
        return res.status(200).send({ msg: " File is uploaded " });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

async function deleteImage(req, res) {
  try {
    const blog = await Blog.findOne({
      // finds one blog based on provided id, and the user created it
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!blog) {
      // If no blog was found, respond with a 400 status and an error msg
      return res.status(400).send({ msg: "Blog not found" });
    }
    // checks if blog's blogImage field is not null
    if (blog.blogImage !== null) {
      let img = blog.blogImage;
      img = img.slice(1);

      // removes the file from directory
      fs.unlink(img, async (error) => {
        if (error) {
          res.status(400).send({ msg: "No such file exists" });
        } else {
          blog.blogImage = null;
          await blog.save();
          res.status(200).send({ msg: "Image was successfully deleted." });
        }
      });
    } else {
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

module.exports = {
  newBlog,
  allBlogs,
  getBlog,
  deleteBlog,
  editBlog,
  addLike,
  removeLike,
  addImage,
  deleteImage,
};
