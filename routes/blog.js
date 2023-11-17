const express = require("express");
const router = express.Router();

const { newBlog } = require("../controllers/blogs");

router.post("/newblog", newBlog);

module.exports = router;
