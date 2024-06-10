
const mongoose = require("mongoose");

const requestsSchema = mongoose.Schema({
    userId: {type:String,required:true},
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: "service"},
    status: {type:String,required:true},
    providerId: {type: mongoose.Schema.Types.ObjectId, ref: "provider"},


  
});



module.exports = mongoose.model("requests", requestsSchema);