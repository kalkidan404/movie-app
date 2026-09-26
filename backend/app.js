import express from "express";
import cors from "cors";
const app=express()
import {Movieroute} from "./router/movieRouter.js";
import {downloadsRouter} from "./router/downloadsRouter.js";
app.use(cors());
app.use(express.json());
app.use("/movies", Movieroute);
app.use("/downloads", downloadsRouter);
export{app}