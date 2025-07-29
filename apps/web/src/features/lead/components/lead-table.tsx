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
          <TableHead className="w-1/12">ID</TableHead>
          <TableHead className="w-2/12">Keyword</TableHead>
          <TableHead className="w-1/12">Status</TableHead>
          <TableHead className="w-2/12">Email</TableHead>
          <TableHead className="w-2/12">Phone</TableHead>
          <TableHead className="w-3/6">Address</TableHead>
          <TableHead className="w-1/6"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leadRows.map((leadRow) => {
          return (
            <TableRow key={leadRow.id}>
              <TableCell className="align-top">{leadRow.id}</TableCell>
              <TableCell className="align-top">{leadRow.keyword}</TableCell>
              <TableCell className="align-top">
                <Badge
                  variant={statusBadgeColorMap[leadRow.status]}
                  className="capitalize"
                >
                  {leadRow.status}
                </Badge>
              </TableCell>
              <TableCell className="align-top">
                {leadRow.email || "N/A"}
              </TableCell>
              <TableCell className="align-top">
                {leadRow.phone || "N/A"}
              </TableCell>
              <TableCell className="whitespace-break-spaces align-top">
                {leadRow.address || "N/A"}
              </TableCell>
              <TableCell className="align-top">{leadRow.action}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
