import express from "express";
const route=express.Router()
import {getMovies, getMovie, addMovie, updateMovie, deleteMovie, getRecommendations} from "../controller/movieController.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
route.get("/",getMovies);
route.get("/:id",getMovie);
route.get("/recommendations", authenticate, getRecommendations);
route.post("/",authenticate,requireAdmin,addMovie);
route.patch("/:id",authenticate,requireAdmin,updateMovie);
route.delete("/:id",authenticate,requireAdmin,deleteMovie);
export {route}