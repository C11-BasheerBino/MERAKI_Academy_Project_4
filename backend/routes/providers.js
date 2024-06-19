const express = require("express");


const providerRouter=express.Router()
const  {registerProvider,loginProvider,getAllProvidersByAdmin,updateProviderStatus} = require("../controllers/providers")


providerRouter.post("/register", registerProvider);
providerRouter.post("/login",loginProvider)
providerRouter.get("/",getAllProvidersByAdmin)
providerRouter.put("/:id",updateProviderStatus)



module.exports = providerRouter;