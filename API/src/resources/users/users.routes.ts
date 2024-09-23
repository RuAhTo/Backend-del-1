import express from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { getUsers, getUser, createUser, updateUser, deleteUser, loginUser } from "./users.controllers";

const router = express.Router();

// CRUD for users

// GET /users: Retrieve a list of users.
router.get("/users", getUsers);

// GET /users/{id}: Retrieve a specific user by ID.
router.get("/users/:id", verifyToken, getUser);

// PUT /users/{id}: Update a specific user by ID.
router.put("/users/:id", verifyToken, updateUser);

// POST /users: Create a new user.
router.post("/users", createUser);

// DELETE /users/{id}: Delete a specific user by ID.
router.delete("/users/:id", verifyToken, deleteUser);

// POST /login: Log in a user.
router.post("/login", loginUser);

export default router;
