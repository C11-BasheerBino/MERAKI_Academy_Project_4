const express = require("express");


const requestsRouter=express.Router()
const  {createRequestByUser,updateStatusByProvider,getRequestbyStatus} = require("../controllers/requests")


requestsRouter.post("/", createRequestByUser);
requestsRouter.put("/:requestId", updateStatusByProvider);
requestsRouter.get("/:status",getRequestbyStatus)




module.exports = requestsRouter;