import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LeadRow, LeadTable } from "@/features/lead/components/lead-table";
import { getLeadStatus } from "@/features/lead/lib/utils";
import { getLeadById } from "@aksel/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage(props: LeadDetailPageProps) {
  const { id } = await props.params;
  const lead = await getLeadById({ id: Number(id) });
  if (!lead || !lead.data) {
    return notFound();
  }

  const leadRows: LeadRow[] = [
    {
      id: String(lead.data.id),
      keyword: lead.data.keyword,
      status: getLeadStatus(lead.data.status),
      email: lead.data.email,
      address: lead.data.address,
      phone: lead.data.phone,
    },
  ];

  return (
    <main className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <LeadTable leadRows={leadRows} />
        </CardContent>
      </Card>
    </main>
  );
}
