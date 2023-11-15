const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function signUp(req, res) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const newUser = await user.save();
    res.status(200).send({ msg: "user is created succesfully", newUser });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function signIn(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    if (!user) {
      return res.status(404).send({msg: 'User not found'})
    } 
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({ msg: 'Invalid password' })
    }
    const token = jwt.sign({
      id: user.id,

    }, proccess.env.API_SECRET, { expiresIn: 86400 })

    res.status(200).send({
      msg: 'Signed In successfully',
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
      token
    })

  } catch(error) {  
    res.status(500).send({ error });
  }
}

module.exports = { signUp };
