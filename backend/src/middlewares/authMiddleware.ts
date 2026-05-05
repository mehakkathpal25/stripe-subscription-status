import express from 'express';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = "your_access_secret_key";
const REFRESH_SECRET = "your_refresh_secret_key";

export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({message: "Authorization header missing"});
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Token missing"});
    }
    try{
        const decoded = jwt.verify(token, ACCESS_SECRET);
        (req as any).user = decoded;
        next();
    }catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
}