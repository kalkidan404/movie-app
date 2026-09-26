import express from "express";

import {
    register,
    login,
    logout,
    getMe,
    updateMe,
    getUsers,
    getUser,
    deleteUser
} from "../controller/userController.js";

import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.post("/logout", authenticate, logout);

userRouter.get("/me", authenticate, getMe);
userRouter.patch("/me", authenticate, updateMe);

userRouter.get("/", authenticate, requireAdmin, getUsers);
userRouter.get("/:id", authenticate, requireAdmin, getUser);
userRouter.delete("/:id", authenticate, requireAdmin, deleteUser);

export { userRouter };