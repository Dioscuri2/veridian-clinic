const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  if (!SECRET_KEY) {
    // Used to return true unconditionally so dev/staging worked without CF
    // setup. That made production silently lose all bot protection the moment
    // the secret went missing, with nothing visible on the page to show it.
    // Dev still skips; production now fails CLOSED.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[turnstile] TURNSTILE_SECRET_KEY is not set in production. Rejecting submission rather than accepting it unverified.",
      );
      return false;
    }
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret: SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) return false;
  const data = await res.json() as { success: boolean };
  return data.success === true;
}
