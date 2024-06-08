const mongoose = require("mongoose");
//  
//  category:{type: mongoose.Schema.Types.ObjectId, ref: "categories"},

const servicesSchema = mongoose.Schema({
  providerID: [{type: mongoose.Schema.Types.ObjectId, ref: "provider"}],
  serviceName:{ type: String,required:true},
  description: { type: String},
  image: { type: String},
  category:{ type: String},
  price:{type:String,required:true}

  
});



module.exports = mongoose.model("service", servicesSchema);
