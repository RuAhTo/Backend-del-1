import { pool } from "./../../db/connect.js";
import bcrypt from "bcrypt";

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

export async function createTodo(req, res) {
    try {
      const { title, content, color, status } = req.body;
  
      const result = await query(
        "INSERT INTO todos (title, content, color, status) VALUES (?, ?, ?, ?)",
        [title, content, color, status]
      );
      
      if (result.affectedRows < 1)
        return res.status(400).json({ error: "User not created!" });
  
      res.status(201).json({ id: result.insertId, message: "Todo created!", title: title, status: status });
    } catch (error) {
      console.error("Error details:", error);
  
      res.status(500).json({ error: "Database query failed!" });
    }
  }