import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
console.log("Success");
await prisma.$disconnect();
