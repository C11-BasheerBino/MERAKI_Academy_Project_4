const express = require("express");
const authentcation=require("../middleware/authentication")

const {createNewService,getAllServices,getServiceById,updateServiceById,deleteServiceById}=require("../controllers/services")

const servicesRouter = express.Router()

servicesRouter.post("/",createNewService)
servicesRouter.get("/",authentcation,getAllServices)
servicesRouter.get("/:id",getServiceById)
servicesRouter.put("/:id",updateServiceById)
servicesRouter.delete("/:id",deleteServiceById)






module.exports=servicesRouter