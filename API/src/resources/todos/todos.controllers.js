import { pool } from "./../../db/connect.js";
import bcrypt from "bcrypt";

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

//GET todos
export async function getTodos(req, res) {
    try {
      const result = await query("SELECT * FROM todos");
  
      if (!result.length)
        return res.status(404).json({ message: "No todos found" });
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error details:", error);
  
      res.status(500).json({ error: "Database query failed!" });
    }
  }

//POST todos
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

  //Update todo

export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, content, color, status } = req.body;

    const result = await query(
      "UPDATE todos SET title = ?, content = ?, color = ?, status = ? WHERE id = ?",
      [title, content, color, status, id]
    );

    if(result.affectedRows < 1)
      return res.status(404).json({ error: "User not updated!" });

    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

export async function updatePartialTodo(req, res) {
  const { id } = req.params;
  const { status } = req.body; // Endast status skickas i requesten

    try {
        // Uppdatera endast statusfältet i databasen
        const result = await query(
          "UPDATE todos SET status = ? WHERE id = ?",
          [status, id]
        );

        if(result.affectedRows < 1)
          return res.status(404).json({ error: "Todos status not update!" });
    
        res.status(200).json({ message: "Status updated!" });
      } catch (error) {
        console.error("Error details:", error);
    
        res.status(500).json({ error: "Database query failed!" });
      }
};