import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { globalGETRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export default async function Page() {
  if (!(await globalGETRateLimit())) {
    return "Too many requests";
  }

  const session = await getCurrentSession();
  if (session !== null) {
    return redirect("/");
  }

  return (
    <main className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            User your Google account to login. We don&apos;t store any data of
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="GET" action="/login/google">
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
