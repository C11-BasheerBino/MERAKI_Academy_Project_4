const fieldModel = require("../models/fields")

const createField=(req,res)=>{
    const {fieldName,description,image,}=req.body
    const newField =new fieldModel({
        fieldName,
        description,
        image,
    })
    newField.save().then((result)=>{
        const keys = {
            success:true,
            message:'new field card created successfully'
        }
        res.json(keys).status(200)
    }).catch((err)=>{
        const keys = {
            success:false,
            message:'server error'
        }
        res.json(keys).status(500)
    })
}

const getAllFields =(req,res)=>{
    fieldModel.find().populate("services").then((result)=>{
        const keys ={
            success: true,
            message: 'All the fields',
            fields: result
        }

        res.json(keys).status(200)
    }).catch((err)=>{
        const keys = {
            success: false,
            message: "Server Error",
            err: err.message
        }
        res.json(keys).status(500)
    })
}

const getFieldById=(req,res)=>{

    const id = req.params.id  //must be taked from token 
    fieldModel.find({_id:id}).then((result)=>{
        const keys ={
            success: true,
            message: 'selected field',
            services: result
        }
        res.json(keys).status(200)
            }).catch((err)=>{
                const keys = {
                    success: false,
                    message: "Server Error",
                    err: err.message
                }
                res.json(keys).status(500)
            })
}



module.exports={createField,getAllFields,getFieldById}