const express = require("express");


const providerRouter=express.Router()
const  {registerProvider} = require("../controllers/providers")


providerRouter.post("/register", registerProvider);

//providerRouter.post("/login", loginUser);

module.exports = providerRouter;