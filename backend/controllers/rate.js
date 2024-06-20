const rateModel = require("../models/rate")
const providerModel = require("../models/provider");

const createRate=(req,res)=>{
    const {userId,rate,providerId}=req.body
    const newRate =new rateModel({
        userId,
        rate,
        providerId,
    })
    newRate.save().then((result)=>{
        providerModel.findOneAndUpdate(
            { _id: providerId },
            { $push: { rate: result._id } },
            { new: true }
          ).then(()=>{
            const keys = {
                success:true,
                message:'rate created successfully '
            }
            res.json(keys).status(200)
          })
       
    }).catch((err)=>{
        const keys = {
            success:false,
            message:'server error'
        }
        res.json(keys).status(500)
    })
}

module.exports ={createRate}