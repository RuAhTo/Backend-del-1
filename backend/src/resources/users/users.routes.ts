import express from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { getUsers, getUser, createUser, updateUser, deleteUser, loginUser, updatePartialUser } from "./users.controllers";

const router = express.Router();

// CRUD for users

// GET /users: Retrieve a list of users.
router.get("/users", getUsers);

// GET /users/{id}: Retrieve a specific user by ID.
router.get("/users/:id", verifyToken, getUser);

// POST /users: Create a new user.
router.post("/users", createUser);

// POST /login: Log in a user.
router.post("/login", loginUser);

// PUT /users/{id}: Update a specific user by ID.
router.put("/users/:id", verifyToken, updateUser);

// DELETE /users/{id}: Delete a specific user by ID.
router.delete("/users/:id", verifyToken, deleteUser);

// PATCH /users/{id}: Update a specific information of a specific user
router.patch("/users/:id", verifyToken, updatePartialUser)



export default router;
