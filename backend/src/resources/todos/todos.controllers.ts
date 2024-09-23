import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//GET todos
export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await prisma.todos.findMany();

    if (!todos.length)
      return res.status(404).json({ message: "No todos found" });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  } finally {
    await prisma.$disconnect();
  }
}

//POST todos
export async function createTodo(req: Request, res: Response) {
  try {
    const { title, content, color, status } = req.body;

    const newTodo = await prisma.todos.create({
      data: {
        title,
        content,
        color,
        status,
      },
    });

    res
      .status(201)
      .json({ id: newTodo.id, message: "Todo created!", title: newTodo.title, status: newTodo.status });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  } finally {
    await prisma.$disconnect();
  }
}

//Update todo
export async function updateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, content, color, status } = req.body;

    const updatedTodo = await prisma.todos.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        color,
        status,
      },
    });

    res.status(200).json({ message: "Todo updated!", todo: updatedTodo });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  } finally {
    await prisma.$disconnect();
  }
}

//Update only status of todo
export async function updatePartialTodo(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTodo = await prisma.todos.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json({ message: "Status updated!", todo: updatedTodo });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  } finally {
    await prisma.$disconnect();
  }
}
