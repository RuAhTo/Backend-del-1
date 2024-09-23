import express from "express";

// Import handlers  from users.controller.js
import {createTodo, getTodos, updatePartialTodo, updateTodo} from "./todos.controllers.js";

const router = express.Router();

// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.


// CRUD for users
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id", updatePartialTodo);

export default router;