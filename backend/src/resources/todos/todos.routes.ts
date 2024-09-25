import express from "express";

// Import handlers from todos.controllers.ts (som använder Prisma)
import { createTodo, getTodos, getUserTodos, updatePartialTodo, updateTodo } from "./todos.controllers"; // Se till att den rätta sökvägen används
import { verifyToken } from "../../middleware/verifyToken";
const router = express.Router();

// CRUD for todos
router.get("/todos", verifyToken, getUserTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id", updatePartialTodo);

export default router;
