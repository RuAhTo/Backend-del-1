import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

require('dotenv').config();


/**
 * @description Get all users
 * @route GET /users 
 */

export async function getUsers(req:Request, res:Response){

    try{
        const users = await prisma.user.findMany();

        if(!users.length) {
            return res.status(404).json({ message: "No users found."})
        }

        res.status(200).json(users);

    } catch (error){

        console.error("Error details:", error)
        res.status(500).json({ error: "Database query failed!"})

    } finally {
        await prisma.$disconnect();
    }
}

/**
 * @description Get user
 * @route GET /users/:id
 */

export async function getUser(req:Request, res:Response){
    try{
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        })

        if (!user){
            return res.status(404).json({message: "User not found."})
        }
        res.status(200).json(user)
    } catch(error){
        console.error('Error details:', error);
        res.status(500).json({ error: 'Database query failed'})
    }finally{
        await prisma.$disconnect();
    }
}

/**
 * @description Create user
 */
 
export async function createUser(req:Request, res:Response) {
    try{
        const { username, password, email } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {email: email},
        })

        if (existingUser){
            return res.status(400).json({ error: "User with this email already exists"})
        }
        const saltRounds = 10;
        const hashedPassaword = await bcrypt.hash(password, saltRounds)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassaword,
                email: email,
            },
        });

        res.status(201).json({ id: newUser.id, message: "User created!", username: newUser.username});
    } catch(error){
        console.error('Error details', error);
        res.status(500).json({ error: 'Database query failed!'})
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * @description Update user
 * @route PUT /users/:id
 */
export async function updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, password, email } = req.body;
  
      // Krypterar lösenordet
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) }, // Se till att id är ett nummer
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });
  
      res.status(200).json({ message: "User updated!", user: updatedUser });
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Database query failed!" });
    }
  }
  
  /**
   * @description Delete user
   * @route DELETE /users/:id
   */
  export async function deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
  
      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }, // Se till att id är ett nummer
      });
  
      res.status(200).json({ message: "User deleted!", user: deletedUser });
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Database query failed!" });
    }
  }

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  
//   Log In User

  export async function loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
  
      const user = await prisma.user.findFirst({
        where: { username },
      });
      
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, id: user.id });
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Login failed!" });
    }
  }