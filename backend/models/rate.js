
const mongoose = require("mongoose");

const rateSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  rate:{ type: Number,required:true},
  comment: { type: String},


  
});



module.exports = mongoose.model("rate", rateSchema);