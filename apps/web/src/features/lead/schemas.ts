import type { LeadStatus } from "./types";

export const LEAD_STATUS: Record<string, LeadStatus> = {
  PROCESSING: "processing",
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
} as const;
