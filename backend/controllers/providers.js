const providerModel = require("../models/provider");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerProvider = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    age,
    country,
    location,
    workField,
    experince,
  } = req.body;

  provider=new providerModel({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    age,
    country,
    location,
    workField,
    experince,
    status:'Pendding',
    role:"6664babe9f801f32457f6dd7"
   
  })
   //role:"123"
  provider.save().then((result)=>{
    const keys = {
        success:true,
        message:'your request on pennding '
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








module.exports={registerProvider}