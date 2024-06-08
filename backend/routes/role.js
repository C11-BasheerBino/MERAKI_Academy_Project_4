const express = require("express")
const {createRole}=require("../controllers/role")
const authentcation=require("../middleware/authentication")
const authorization=require("../middleware/authorization")

const roleRouter = express.Router()

roleRouter.post("/",authentcation,authorization("ANYTHING"),createRole)


module.exports= roleRouter