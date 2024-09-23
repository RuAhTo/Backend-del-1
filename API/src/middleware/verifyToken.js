import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    console.log('Authorization header:', req.headers['authorization']);
    console.log('Token:', token);

    if (!token) return res.status(403).send('Access denied'); // Förbjudet

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user; // Spara användarinformationen i req.user
        next(); // Fortsätt till nästa middleware/rutt
    });
}
