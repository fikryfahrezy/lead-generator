import { Button } from "./ui/button";

export type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <form method="GET" action="/api/logout" className={className}>
      <Button variant="destructive">Sign out</Button>
    </form>
  );
}
