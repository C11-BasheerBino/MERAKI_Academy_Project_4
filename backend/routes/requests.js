const express = require("express");


const requestsRouter=express.Router()
const  {createRequestByUser,updateStatusByProvider,getRequestbyStatus,getAllRequests} = require("../controllers/requests")


requestsRouter.post("/", createRequestByUser);
requestsRouter.put("/:requestId", updateStatusByProvider);
requestsRouter.get("/:status",getRequestbyStatus)
requestsRouter.get("/",getAllRequests)




module.exports = requestsRouter;