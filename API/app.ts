import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./src/resources/users/users.routes";
import todosRouter from "./src/resources/todos/todos.routes";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Initiera Prisma-klienten
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json()); // Använd inbyggd JSON-parser

// API routes
app.use("/api/users", userRouter);
app.use("/api/todos", todosRouter);

// Lyssna på port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Stäng Prisma-klienten vid processavslut
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
