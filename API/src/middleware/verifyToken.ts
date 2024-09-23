import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload; // Typen för user beroende på vad JWT returnerar
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  console.log('Authorization header:', authHeader);
  console.log('Token:', token);

  if (!token) {
    return res.status(403).send('Access denied'); // Förbjudet
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user; // Spara användarinformationen i req.user
    next(); // Fortsätt till nästa middleware/rutt
  });
}
