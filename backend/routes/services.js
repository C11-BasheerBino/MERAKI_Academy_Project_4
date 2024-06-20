const express = require("express");
const authentcation=require("../middleware/authentication")

const {createNewService,getAllServices,getServiceByProvider,updateServiceById,deleteServiceById,getServiceById}=require("../controllers/services")

const servicesRouter = express.Router()

servicesRouter.post("/",createNewService)
servicesRouter.get("/",authentcation,getAllServices)
servicesRouter.get("/:id",getServiceByProvider)
servicesRouter.get("/oneService/:id",getServiceById)
servicesRouter.put("/:id",authentcation,updateServiceById)
servicesRouter.delete("/:id",authentcation,deleteServiceById)






module.exports=servicesRouter