require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ;

//Import Database connection
const db = require("./models/db");


app.use(cors());
app.use(express.json());




//imprt userRouter 
const userRouter=require("./routes/users")
app.use("/users",userRouter)

//importprovider Router 
const providerRouter=require("./routes/providers")
app.use("/providers",providerRouter)

//import Services Router 
const servicesRouter=require("./routes/services")
app.use("/services",servicesRouter)

//import Role Router 
const roleRouter=require("./routes/role")
app.use("/role",roleRouter)

//import Requests  Router
const requestsRouter=require('./routes/requests')
app.use("/requests",requestsRouter)

//import Fields Router 
const fieldsRouter=require("./routes/fields")
app.use("/fields",fieldsRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
