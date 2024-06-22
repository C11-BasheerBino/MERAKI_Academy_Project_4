
const mongoose = require("mongoose");

const requestsSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: "service"},
    status: {type:String,required:true},
    providerId: {type: mongoose.Schema.Types.ObjectId, ref: "provider"},
    startTime:{type:Number},
    finishTime:{type:Number},


  
});



module.exports = mongoose.model("requests", requestsSchema);