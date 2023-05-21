import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createJWT = (user: User): string => {
  const token = jwt.sign(
    {
      id: user.id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
  );

  return token;
};

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({
      message: 'No bearer! Unauthorized',
    });
  }
  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not a valid token! Unauthorized',
    });
  }
};

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};
