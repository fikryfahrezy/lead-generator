import { prisma } from "./client";

export async function leadCount() {
  return await prisma.lead.count();
}
