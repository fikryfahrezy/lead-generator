import { getLeadByKeyword } from "@aksel/db";
import { notFound } from "next/navigation";

type LeadDetailPageProps = {
  params: Promise<{ keyword: string }>;
};

export default async function LeadDetailPage(props: LeadDetailPageProps) {
  const { keyword } = await props.params;
  const lead = await getLeadByKeyword({ keyword });
  if (!lead) {
    return notFound();
  }

  return <pre>{JSON.stringify(lead)}</pre>;
}
