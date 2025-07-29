import type { LeadStatus } from "./types";

export const LEAD_STATUS = {
  PROCESSING: "processing",
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
} as const satisfies Record<string, LeadStatus>;
