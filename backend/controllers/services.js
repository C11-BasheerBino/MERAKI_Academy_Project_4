servicesModel=require("../models/services")

const createNewService = (req,res)=>{
    const { providerID,
    serviceName,
    description,
    image,
    category,
    price,
    }=req.body
const service = new servicesModel({
    providerID,
    serviceName,
    description,
    image,
    category,
    price,
})
service.save().then((result)=>{
const keys ={
    success:true,
    message:result
}
res.json(keys).status(201)
}).catch((err)=>{
keys= {
    success:false,
    message:err.message
}
res.json(keys).status(500)
})
}

const getAllServices=(req,res)=>{
    servicesModel.find().exec().then((result)=>{
const keys ={
    success: true,
    message: 'All the Services',
    services: result
}
res.json(keys).status(200)
    }).catch((err)=>{
        const keys = {
            success: false,
            message: "Server Error",
            err: err.message
        }
        res.json(keys).status(500)
    })
}

const getServiceById=(req,res)=>{
    const id = req.params.id
    servicesModel.find({id}).exec().then((result)=>{
        const keys ={
            success: true,
            message: 'All the Services',
            services: result
        }
        res.json(keys).status(200)
            }).catch((err)=>{
                const keys = {
                    success: false,
                    message: "Server Error",
                    err: err.message
                }
                res.json(keys).status(500)
            })
}

module.exports={createNewService,getAllServices}