import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddLeadModal } from "@/features/lead/components/add-lead-modal";
import { LeadRow, LeadTable } from "@/features/lead/components/lead-table";
import { getLeadStatus } from "@/features/lead/lib/utils";
import { getAllLeads } from "@aksel/db";
import Link from "next/link";

export default async function HomePage() {
  const leads = await getAllLeads();
  if (!leads.success) {
    return <p className="text-destructive">Fail to get leads data.</p>;
  }

  const leadRows: LeadRow[] = leads.data.map((lead) => {
    return {
      id: String(lead.id),
      keyword: lead.keyword,
      status: getLeadStatus(lead.status),
      email: lead.email,
      address: lead.address,
      phone: lead.phone,
      action: (
        <Button asChild variant="link" size="sm">
          <Link href={lead.keyword}>Detail</Link>
        </Button>
      ),
    };
  });

  return (
    <main className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <AddLeadModal />
        </CardHeader>
        <CardContent className="h-full max-h-96 overflow-y-auto">
          <LeadTable leadRows={leadRows} />
        </CardContent>
      </Card>
    </main>
  );
}
