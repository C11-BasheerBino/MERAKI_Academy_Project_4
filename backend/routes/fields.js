const express=require("express")


const fieldsRouter = express.Router()
const {createField,getAllFields,getFieldById}=require('../controllers/fields')

fieldsRouter.post('/',createField)
fieldsRouter.get("/",getAllFields)
fieldsRouter.get("/:id",getFieldById)

module.exports= fieldsRouter