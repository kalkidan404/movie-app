const express=require("express");
const cors=require("cors")
const app=express()
const movies=require("./router/movieRouter")
const downloads=require("./router/downloads")
app.use(cors());
app.use(express.json());
app.use("/", movies);
app.use("/downloads", downloads);
module.exports=app;