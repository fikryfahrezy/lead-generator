/**
 * Ref: https://github.com/lucia-auth/example-nextjs-google-oauth/blob/main/app/login/google/callback/route.ts
 */
import { setSessionTokenCookie } from "@/lib/server/session";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { globalGETRateLimit } from "@/lib/server/request";
import { decodeIdToken, type OAuth2Tokens } from "arctic";

export async function GET(request: Request): Promise<Response> {
  if (!(await globalGETRateLimit())) {
    return new Response("Too many requests", {
      status: 429,
    });
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response("Please restart the process.", {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response("Please restart the process.", {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    return new Response("Please restart the process.", {
      status: 400,
    });
  }

  // The return type from `decodeIdToken` is `object` which cannot be accessed directly.
  // So assert it to `Record` to be accessible for the simplicty of current scenario,
  // could be use safer approach in the future.
  const claims = decodeIdToken(tokens.idToken()) as Record<string, unknown>;
  const googleId = claims["sub"];

  if (!googleId) {
    return new Response("Please restart the process.", {
      status: 400,
    });
  }

  const googleIdString = String(googleId);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  // Create session token from user's Google ID for simplicity purpose
  await setSessionTokenCookie(googleIdString, expiresAt);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
