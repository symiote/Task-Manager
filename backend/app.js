const express = require("express");
const app = express();
const { conn } = require("./conn/conn");
require("dotenv").config();
const cors = require("cors")
const UserAPI  = require("./routes/userRoute");
const taskRoute = require("./routes/taskroute");

//monodb connection
conn();

app.use(cors());
app.use(express.json())


app.use("/api/v1",UserAPI);
app.use("/api/v2",taskRoute);

// app.use("/",(req,res)=>{
//     res.send("heelow form backend side")
// })

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("server is listen at ",PORT);
})
