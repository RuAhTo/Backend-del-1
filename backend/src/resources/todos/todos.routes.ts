import express from "express";

// Import handlers from todos.controllers.ts (som använder Prisma)
import { createTodo, getTodos, updatePartialTodo, updateTodo } from "./todos.controllers"; // Se till att den rätta sökvägen används

const router = express.Router();

// CRUD for todos
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id", updatePartialTodo);

export default router;
