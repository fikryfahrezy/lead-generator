import { LEAD_STATUS } from "../schemas";
import type { LeadStatus } from "../types";

export function getLeadStatus(status: string): LeadStatus {
  return LEAD_STATUS[status.toUpperCase()] ?? "unknown";
}
