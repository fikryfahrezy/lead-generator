import { LogoutButton } from "@/components/logout-button";
import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (session !== null) {
    return redirect("/");
  }

  return (
    <>
      <nav className="flex items-center justify-end border-b-2 p-6">
        <LogoutButton />
      </nav>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        {children}
      </div>
    </>
  );
}
