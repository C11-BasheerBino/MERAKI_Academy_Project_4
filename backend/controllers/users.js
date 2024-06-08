
const usersModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')

const registerUser = (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    phoneNumber,
    location,
    email,
    password,
    role,
  } = req.body;
  user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    phoneNumber,
    location,
    email,
    password,
    role,
  });
  user.save().then((result)=>{
    const keys = {
        success:true,
        message:'user added Successfully'
    }
    res.json(keys).status(200)

  }).catch((err)=>{
    const keys = {
        success:false,
        message:'The email already exists'
    }
    res.json(keys).status(409)
  })
};

const loginUser = (req,res)=>{
  const email=req.body.email
  const password = req.body.password
  usersModel.find({email}).then(async (result)=>{
if(!result){ 
  keys={
    success: false,
    message: `The email doesn't exist or The password you’ve entered is incorrect`,
  }
  return res.status(403).json(keys)}else {
    const isSame = bcrypt.compare(password, result.password);
    if(!isSame){
      const keys = {
        success: false,
        massage:"The email doesn’t exist or the password you’ve entered is incorrect",
      };
      res.status(403).json(keys);
    }else {
      const payload = {
        userId: result._id,
      
      };
      const options = {
        expiresIn: '60m'
      };
      const token = jwt.sign(payload, process.env.SECRET, options);
      const keys = {
        success: true,
        massage: "Valid login credentials",
        token: token,
      };
      res.json(keys).status(200);
    }
  }
  }).catch((err)=>{
    res.send(err)
  })
}

module.exports= {registerUser, loginUser}