"use server";

import { globalPOSTRateLimit } from "@/lib/server/request";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
} from "@/lib/server/session";
import { redirect } from "next/navigation";

export type LogoutActionResult = {
  message: string;
};

export async function logoutAction(): Promise<LogoutActionResult> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests",
    };
  }
  const session = getCurrentSession();
  if (session === null) {
    return {
      message: "Not authenticated",
    };
  }

  await deleteSessionTokenCookie();
  return redirect("/login");
}
