import { globalGETRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  if (!(await globalGETRateLimit())) {
    return "Too many requests";
  }

  const session = await getCurrentSession();
  if (session !== null) {
    return redirect("/");
  }

  return (
    <>
      <h1>Sign in</h1>
      <a href="/login/google">Sign in with Google</a>
    </>
  );
}
