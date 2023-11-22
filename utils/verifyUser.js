const jwt = require('jsonwebtoken');
const User= require('../models/user');

const verifyUser = (req, res, next) => {
  console.log(req.headers.authorization)
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify (req.headers.authorization.split(' ')[1], process.env.API_SECRET, async (error, decode)=> {
      if(error) {
        req.user = undefined;
        return res.status(500).send({error})
      }
      const user = await User.findById(decode.id).exec();
      if (!user) {
        return res.status(404).send({ msg: "User was not found" });
      } else {
        req.user = user;
        next();
      }
    })
  } 
  else {
    req.user = undefined;
    return res.status(401).send({msg: 'Not a valid token'})
  }
}


module.exports = verifyUser;