import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import loadEnvFile from 'process';
loadEnvFile('.env')

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify(), token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        return next();

    } catch (error) {
        res.status(401).json({ error: 'Token invalid' });
    }

    return next();
} 