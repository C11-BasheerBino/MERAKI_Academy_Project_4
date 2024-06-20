
const mongoose = require("mongoose");

const rateSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "user",},
  rate:{ type: Number,required:true},
  providerId:{type: mongoose.Schema.Types.ObjectId, ref: "provider",}

  
});



module.exports = mongoose.model("rate", rateSchema);