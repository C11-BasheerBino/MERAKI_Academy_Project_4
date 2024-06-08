const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const providerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  workField:{type:String,required:true},
  experince:{type:Number,required:true},
  status:{type:String,required:true},
  role:{type: mongoose.Schema.Types.ObjectId, ref: "role"}
  
});

providerSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("provider", providerSchema);
