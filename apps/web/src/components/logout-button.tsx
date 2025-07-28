"use client";

import { logoutAction, type LogoutActionResult } from "@/actions/auth";
import { useActionState } from "react";
import { Button } from "./ui/button";

const initialState: LogoutActionResult = {
  message: "",
};

export type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  const [, action] = useActionState(logoutAction, initialState);
  return (
    <form action={action} className={className}>
      <Button variant="destructive">Sign out</Button>
    </form>
  );
}
