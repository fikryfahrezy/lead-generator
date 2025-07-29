export type LeadStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "unknown";

export type Lead = {
  id: string;
  keyword: string;
  status: LeadStatus;
  email: string;
  phone: string;
  address: string;
};
