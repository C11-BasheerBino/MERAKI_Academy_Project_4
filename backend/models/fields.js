const mongoose = require("mongoose");

const fieldsSchema = mongoose.Schema({
  fieldName: { type: String, required: true },
  description: { type: String},
  image: { type: String},
  services: [{type: mongoose.Schema.Types.ObjectId, ref: "service"}]
  
});



module.exports = mongoose.model("field", fieldsSchema);
