import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export interface UserPayload {
  id: number;
  username: string;
}

export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: UserPayload) => {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};
