import { globalPOSTRateLimit } from "@/lib/server/request";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
} from "@/lib/server/session";

export async function GET(): Promise<Response> {
  if (!(await globalPOSTRateLimit())) {
    return new Response("Too many requests", {
      status: 429,
    });
  }

  const session = getCurrentSession();
  if (session === null) {
    return new Response("Please restart the process.", {
      status: 400,
    });
  }

  await deleteSessionTokenCookie();
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
}
