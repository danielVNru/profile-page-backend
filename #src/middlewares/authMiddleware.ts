import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config()

// Секрет для токена (используйте переменные окружения в реальных приложениях)
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';

/**
 * Middleware для проверки JWT токена с опциональной проверкой.
 * 
 * @param {boolean} required - Флаг обязательности проверки токена. Если false, то при неудачной проверке будет вызван next(), но payload будет null.
 */
export const authenticateJWT = (required: boolean = true) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      if (required) {
        res.status(401).json({ error: 'Authorization header missing' });
        return;
      } else {
        req.payload = null;
        next();
        return;
      }
    }

    const token = authHeader.split(' ')[1];

    // Проверка JWT токена
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        if (required) {
          res.status(403).json({ error: 'Invalid token', details: err.message });
          return;
        } else {
          req.payload = null;
          next();
          return;
        }
      }

      req.payload = payload;
      next(); 
    });
  };
};
