const jwt = require("jsonwebtoken"); // import jsonwebtoken for token authentication
const bcrypt = require("bcrypt"); // import bcrypt for passwrod hashing
const User = require("../models/user"); // import user model to create new user
const path = require("path");

async function signUp(req, res) {
  const user = new User({
    // creating new user and saving it user const by using User model
    userName: req.body.userName, // with the userName field- value is accpeted from req.body
    email: req.body.email, // email field - value accepted from req.body
    password: bcrypt.hashSync(req.body.password, 8), // password field - value is accepted from req.body and gets hashed by bcrypt library, hashSync method, with
  }); // it gets second param , 8 for adding extra layer of security. After that password is saved to th db.
  try {
    const newUser = await user.save(); // after creating new user it is saved to the collection
    res.status(200).send({ msg: "user is created succesfully", newUser }); // and success status 200 along with the msg is sent
  } catch (error) {
    res.status(500).send({ error }); // in case of the error catch will send error msg
  }
}

async function signIn(req, res) {
  try {
    const user = await User.findOne({
      // finds the user be their email
      email: req.body.email, //email is the value from req.body
    });

    if (!user) {
      // if user is not found, return 404 response with the msg
      return res.status(404).send({ msg: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    ); //compares the provided password with the hashed one stored in the db

    if (!passwordIsValid) {
      // if passwords do not match, 401 response with msg will be sent
      return res.status(401).send({ msg: "Invalid password" });
    }
    const token = jwt.sign(
      {
        //otherwise generates new token for the registered user
        id: user.id, // and saves it as an user id
      },
      process.env.API_SECRET,
      { expiresIn: 86400 }
    ); // jwt uses secret to sign the token, and specifies the expiration date
    res.status(200).send({
      // user is returned with success msg
      msg: "Signed In successfully",
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
      token, // new token is a string returned to the registered user
    });
  } catch (error) {
    // handles any error that might occure during the authentication process
    res.status(500).send({ error });
  }
}

// adds user icon 
async function addUserIcon(req, res) {
  try {
    const { id } = req.user.id;
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send("No files were uploaded.");

    if (Object.keys(req.files).length > 1)
      return res.status(400).send("Only one file will be accepted.");

    const uploadFile = req.files.uploadFile;

    if (!uploadFile.mimetype.match("image")) {
      return res.status(400).send({ msg: "Please upload an image" });
    }
    // finds user by id
    const user = await User.findOne({
      id: id
    });

    if (!user) {
      // If no user was found, respond with a 400 status and an error msg
      return res.status(400).send({ msg: "User not found" });
    } else {
      // get file's extension type // jpeg, png, svg
      let fileExtensionName = uploadFile.name.split(".");
      fileExtensionName = fileExtensionName[fileExtensionName.length - 1];

      const uploadPath = path.join(
        __dirname,
        `../upload/${user.userName}.${fileExtensionName}`
      );

      uploadFile.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);
        user.userIcon = `/upload/${user.userName}.${fileExtensionName}`;

        await user.save();
        return res.status(200).send({ msg: "User's image is uploaded " });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error occured", error: error.message });
  }
}

module.exports = { signUp, signIn, addUserIcon };
