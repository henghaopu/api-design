import { body } from 'express-validator';
import { Request, Response } from 'express';
import prisma from '../db';
import { Product, Update } from '@prisma/client';
// doesn't work
export const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsTo: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce(
    (
      allUpdates: Update[],
      product: Product & {
        updates: Update[];
      },
    ): Update[] => [...allUpdates, ...product.updates],
    [],
  );

  res.json({ data: updates });
};

export const getUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: 'nope' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};
export const updateUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce(
    (
      allUpdates: Update[],
      product: Product & {
        updates: Update[];
      },
    ): Update[] => [...allUpdates, ...product.updates],
    [],
  );

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: 'nope' });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce(
    (
      allUpdates: Update[],
      product: Product & {
        updates: Update[];
      },
    ): Update[] => [...allUpdates, ...product.updates],
    [],
  );

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: 'nope' });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
