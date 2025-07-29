import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lead, LeadStatus } from "../types";

export type LeadRow = Lead & {
  action?: React.ReactNode;
};

export type LeadTableProps = {
  leadRows: LeadRow[];
};

export function LeadTable({ leadRows }: LeadTableProps) {
  const statusBadgeColorMap: Record<
    LeadStatus,
    React.ComponentProps<typeof Badge>["variant"]
  > = {
    unknown: "primary-subtle",
    failed: "destructive-subtle",
    success: "success-subtle",
    pending: "warning-subtle",
    processing: "warm-subtle",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="w-1/6">Keyword</TableHead>
          <TableHead className="w-1/6">Status</TableHead>
          <TableHead className="w-1/6">Email</TableHead>
          <TableHead className="w-1/6">Phone</TableHead>
          <TableHead className="w-1/6">Adress</TableHead>
          <TableHead className="w-1/6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leadRows.map((leadRow) => {
          return (
            <TableRow key={leadRow.id}>
              <TableCell>{leadRow.id}</TableCell>
              <TableCell>{leadRow.keyword}</TableCell>
              <TableCell>
                <Badge
                  variant={statusBadgeColorMap[leadRow.status]}
                  className="capitalize"
                >
                  {leadRow.status}
                </Badge>
              </TableCell>
              <TableCell>{leadRow.email || "N/A"}</TableCell>
              <TableCell>{leadRow.phone || "N/A"}</TableCell>
              <TableCell>{leadRow.address || "N/A"}</TableCell>
              <TableCell>{leadRow.action}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
