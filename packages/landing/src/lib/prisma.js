import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis;

// Create a single pg pool for the app
const pool =
  globalForPrisma.pgPool ||
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
