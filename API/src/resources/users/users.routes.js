import express from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";

// Import handlers  from users.controller.js
import {getUsers, getUser, createUser, updateUser, deleteUser, loginUser} from "./users.controllers.js";

const router = express.Router();

// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.


// CRUD for users
router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUser);
router.put("/users/:id", verifyToken, updateUser);
router.post("/users", createUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.post("/login", loginUser);



export default router;