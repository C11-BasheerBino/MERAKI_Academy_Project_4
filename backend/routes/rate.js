const express = require("express");

const rateRouter = express.Router();
const {createRate}=require("../controllers/rate")

rateRouter.post("/", createRate);


module.exports=rateRouter