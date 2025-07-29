import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
export type { Lead } from "@prisma/client";

export type LeadProcessStatus = "pending" | "processing" | "success" | "failed";

export const LEAD_PROCESS_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SUCCESS: "success",
  FAILED: "failed",
} as const satisfies Record<string, LeadProcessStatus>;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
