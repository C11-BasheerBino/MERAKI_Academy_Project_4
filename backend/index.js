require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ;

//Import Database connection
const db = require("./models/db");


app.use(cors());
app.use(express.json());

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

//imprt userRouter 
const userRouter=require("./routes/users")
app.use("/users",userRouter)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
