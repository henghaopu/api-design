import { Request, Response, NextFunction } from 'express';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import prisma from '../db';

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await prisma.user.create({
      data: {
        userName: req.body.userName,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.userName,
    },
  });

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res
      .status(401)
      .json({ message: 'Invalid credentials (userName or password)' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
