import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (session === null) {
    return redirect("/login");
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 flex items-center justify-end border-b-2 bg-white p-6">
        <form method="GET" action="/api/logout">
          <Button variant="destructive">Sign out</Button>
        </form>
      </nav>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        {children}
      </div>
    </>
  );
}
