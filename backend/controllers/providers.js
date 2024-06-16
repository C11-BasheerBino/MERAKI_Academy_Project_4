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

/// //// ////

const loginProvider = (req,res)=>{
  const email=req.body.email
  const newPassword = req.body.password
  providerModel.findOne({email}).populate('role','-_id -__v').then(async (result)=>{
if(!result){ 
  keys={
    success: false,
    message: `The email doesn't exist or The password you’ve entered is incorrect`,
  }
  return res.status(403).json(keys)}
if(result.status==='Pendding'){
  keys={
    success: false,
    message: `The Provider in waitng list please try later or contact us for more details`,
  }
  return res.status(200).json(keys)}

  try {
    const isSame =await bcyrpt.compare(newPassword, result.password);
    if(!isSame){
      const keys = {
        success: false,
        massage:"The email doesn’t exist or the password you’ve entered is incorrect",
      };
     return res.status(403).json(keys);
    }
    const payload = {
      providerId: result._id,
      role:result.role,
      status:'Provider'
    
    };
    const options = {
      expiresIn: '60m'
    };
    const token = jwt.sign(payload, process.env.SECRET, options);
    const keys = {
      success: true,
      message: "Valid login credentials",
      token: token,
    };
return res.json(keys).status(200);

  } catch (error) {
    throw new Error(error.message);

  }
}).catch((err)=>{
  res.send(err)
})
}






module.exports={registerProvider,loginProvider}