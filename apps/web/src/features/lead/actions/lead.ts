"use server";

import { createLead, type CreateLeadIn } from "@aksel/db";
import { redirect } from "next/navigation";

export type NewLeadState = {
  success: boolean;
  message: string;
};

export async function newLeadAction(
  _: NewLeadState,
  formData: FormData,
): Promise<NewLeadState> {
  const createLeadIn: CreateLeadIn = {
    // The `.get` possible value is `File | string` or string
    // for now the `keyword` is to be expected as string.
    // Use proper validator in real world app.
    keyword: String(formData.get("keyword")),
  };

  const newLead = await createLead(createLeadIn);
  if (!newLead.success) {
    return {
      success: false,
      message: "Failed to create new lead.",
    };
  }

  redirect(`/${newLead.data.keyword}`);
}
