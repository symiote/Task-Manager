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

app.use(cors({
    origin: process.env.CLIENT_URL || "*",  // only allow this frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json())

app.use("/api/v1",UserAPI);
app.use("/api/v2",taskRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("server is listen at ",PORT);
})
