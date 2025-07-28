"use client";

import { logoutAction, type LogoutActionResult } from "@/actions/auth";
import { useActionState } from "react";

const initialState: LogoutActionResult = {
  message: "",
};

export function LogoutButton() {
  const [, action] = useActionState(logoutAction, initialState);
  return (
    <form action={action}>
      <button>Sign out</button>
    </form>
  );
}
