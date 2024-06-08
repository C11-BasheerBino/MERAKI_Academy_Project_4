const mongoose = require("mongoose");
//  providerID: [{type: mongoose.Schema.Types.ObjectId, ref: "provider"}],
//  category:{type: mongoose.Schema.Types.ObjectId, ref: "categories"},

const servicesSchema = mongoose.Schema({
  serviceName:{ type: String,required:true},
  description: { type: String},
  image: { type: String},
  category:{ type: String},
  price:{type:String,required:true}

  
});



module.exports = mongoose.model("service", servicesSchema);
