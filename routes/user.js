const express = require("express"); // import express
const router = express.Router(); // create router and save it to const router

const {
  signUp,
  signIn,
  updateUserPassword,
  addUserIcon,
  deleteUserIcon,
} = require("../controllers/auth");
const verifyUser = require("../utils/verifyUser");

router.post("/signUp", signUp); // route with url endpoint with POST HTTP method for creating a new user
router.post("/signIn", signIn); // route with url endpoint with POST HTTP method for signing in
router.patch("/user", verifyUser, updateUserPassword);
router.post("/user/addIcon", verifyUser, addUserIcon);
router.delete("/user/deleteIcon", verifyUser, deleteUserIcon);

// export router
module.exports = router;
