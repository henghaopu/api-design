import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// use prisma in your app to read and write data in your database

export default prisma;
