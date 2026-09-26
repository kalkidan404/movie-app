//login, logout, users, userId
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../src/prisma/db.js";


// REGISTER
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const existingUser = await db.orm.public.User.findUnique({
            where: {
                username
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await db.orm.public.User.create({
            data: {
                username,
                passwordHash
            }
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};


// LOGIN
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await db.orm.public.User.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};


// LOGOUT
const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};


// GET CURRENT USER
const getMe = async (req, res, next) => {
    try {
        const user = await db.orm.public.User.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                role: true
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


// UPDATE CURRENT USER
const updateMe = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const data = {};

        if (username !== undefined) {
            if (!username.trim()) {
                return res.status(400).json({
                    message: "Username cannot be empty"
                });
            }

            const existingUser = await db.orm.public.User.findUnique({
                where: {
                    username
                }
            });

            if (existingUser && existingUser.id !== req.user.id) {
                return res.status(409).json({
                    message: "Username already exists"
                });
            }

            data.username = username;
        }

        if (password !== undefined) {
            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters"
                });
            }

            data.passwordHash = await bcrypt.hash(password, 10);
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: "No information to update"
            });
        }

        const user = await db.orm.public.User.update({
            where: {
                id: req.user.id
            },
            data
        });

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};


// GET ALL USERS - ADMIN
const getUsers = async (req, res, next) => {
    try {
        const users = await db.orm.public.User.findMany({
            select: {
                id: true,
                username: true,
                role: true,
                downloads: true
            }
        });

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


// GET ONE USER - ADMIN
const getUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await db.orm.public.User.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                role: true,
                downloads: true
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


// DELETE USER - ADMIN
const deleteUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await db.orm.public.User.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await db.orm.public.User.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


export {
    register,
    login,
    logout,
    getMe,
    updateMe,
    getUsers,
    getUser,
    deleteUser
};