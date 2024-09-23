import express from "express";

// Import handlers from todos.controllers.ts
import { createTodo, getTodos, updatePartialTodo, updateTodo } from "./todos.controllers";

const router = express.Router();

// CRUD for todos
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id", updatePartialTodo);

export default router;
