import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage() {
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
          <form method="GET" action="/api/login/google">
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
