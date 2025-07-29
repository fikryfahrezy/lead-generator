"use server";

import { createLead, getLeadByKeyword } from "@aksel/db";
import { redirect } from "next/navigation";

export type NewLeadState = {
  success: boolean;
  message: string;
};

export async function newLeadAction(
  _: NewLeadState,
  formData: FormData,
): Promise<NewLeadState> {
  // The `.get` possible value is `File | string` or string
  // for now the `keyword` is to be expected as string.
  // Use proper validator in real world app.
  const keyword = String(formData.get("keyword"));

  const existingLead = await getLeadByKeyword({
    keyword: keyword,
  });
  if (!existingLead.success) {
    return {
      success: false,
      message: "Failed to create new lead. Unable to check existing lead.",
    };
  }

  if (existingLead.data) {
    return redirect(`/${existingLead.data.keyword}`);
  }

  const newLead = await createLead({
    keyword: keyword,
  });
  if (!newLead.success) {
    return {
      success: false,
      message: "Failed to create new lead.",
    };
  }

  redirect(`/${newLead.data.keyword}`);
}
