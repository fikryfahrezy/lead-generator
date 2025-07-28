import "server-only";

/**
 * Ref: https://github.com/lucia-auth/example-nextjs-google-oauth/blob/main/lib/server/session.ts
 */
import { cookies } from "next/headers";
import { cache } from "react";
import { AES256GCM } from "../encryption/aes";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "";
const encryptor = new AES256GCM(Buffer.from(SESSION_SECRET, "base64"));

export const getCurrentSession = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value ?? null;
  if (session === null) {
    return null;
  }
  return encryptor.decrypt(session);
});

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  const encryptedToken = encryptor.encrypt(token);

  // For current case, we only use "simple" token, we don't store the session on the database,
  // only for store it on HTTP cookie as we just need it for simple login
  cookieStore.set("session", encryptedToken, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
