const requestsModel = require("../models/requests");


const createRequestByUser = (req, res) => {
  const {
    serviceId,
    providerId, //! just for test 
    userId,   //! just for test 
} = req.body;

  request=new requestsModel({
   userId,    //!just for test replace with req.token.userId
   serviceId,
   status:"Pendding",
   providerId,
   
  })

  request.save().then((result)=>{
    const keys = {
        success:true,
        message:'the request sended to provider'
    }
    res.json(keys).status(200)

  }).catch((err)=>{
    const keys = {
        success:false,
        message:err.message
    }
    res.json(keys).status(409)
  })

  
};


const updateStatusByProvider = (req,res)=>{
const newStatus = req.body.status
    const _id =req.params.requestId//! just for test 
    requestsModel.findByIdAndUpdate({_id}, {status:newStatus}, { new: true }).then((result)=>{
        const keys ={
            success: true,
            message: `status is ${newStatus}` ,
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

const getRequestbyStatus = (req,res)=>{
    const calledStatus= req.params.status
    requestsModel.find({status:calledStatus}).populate("serviceId").then((result)=>{
        const keys ={
            success: true,
            message: 'All the requests',
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

const getAllRequests = (req,res)=>{
    requestsModel.find().populate("serviceId").then((result)=>{
        const keys ={
            success: true,
            message: 'All the requests',
            services: result
        }
        console.log(result)
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

const getRequestsByProviderID =(req,res)=>{
    const provderId= req.params.provderId
    requestsModel.find({providerId:provderId}).populate("serviceId userId providerId").then((result)=>{
        const keys ={
            success: true,
            message: 'All the requests',
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

    




module.exports={createRequestByUser,updateStatusByProvider,getRequestbyStatus,getAllRequests,getRequestsByProviderID}