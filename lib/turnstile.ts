const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  if (!SECRET_KEY) {
    // Skip verification if env var not set — enables dev/staging without CF setup
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
