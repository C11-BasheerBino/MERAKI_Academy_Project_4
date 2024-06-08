const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
  providerID: [{type: mongoose.Schema.Types.ObjectId, ref: "provider"}],
  serviceName:{ type: String,required:true},
  description: { type: String},
  image: { type: String},
  category:{type:String},

  
});



module.exports = mongoose.model("service", servicesSchema);
