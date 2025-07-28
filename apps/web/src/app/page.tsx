import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { globalGETRateLimit } from "@/lib/server/request";

export default async function Page() {
  if (!(await globalGETRateLimit())) {
    return "Too many requests";
  }
  const session = await getCurrentSession();
  if (session === null) {
    return redirect("/login");
  }
  return (
    <>
      <h1>Hi, {session}!</h1>
      <LogoutButton />
    </>
  );
}
