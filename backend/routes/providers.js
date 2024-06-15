const express = require("express");


const providerRouter=express.Router()
const  {registerProvider,loginProvider} = require("../controllers/providers")


providerRouter.post("/register", registerProvider);
providerRouter.post("/login",loginProvider)

//providerRouter.post("/login", loginUser);

module.exports = providerRouter;