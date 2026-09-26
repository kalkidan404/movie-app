import express from "express";
const Movieroute=express.Router()
import {getMovies, getMovie, addMovie, updateMovie, deleteMovie, getRecommendations} from "../controller/movieController.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
Movieroute.get("/",getMovies);
Movieroute.get("/:id",getMovie);
Movieroute.get("/recommendations", authenticate, getRecommendations);
Movieroute.post("/",authenticate,requireAdmin,addMovie);
Movieroute.patch("/:id",authenticate,requireAdmin,updateMovie);
Movieroute.delete("/:id",authenticate,requireAdmin,deleteMovie);
export {Movieroute}