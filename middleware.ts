import { NextRequest, NextResponse } from "next/server";

// ── Security headers on every response ───────────────────────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(self \"https://js.stripe.com\")",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "frame-src https://js.stripe.com https://hooks.stripe.com",
    "connect-src 'self' https://api.stripe.com https://checkout.stripe.com",
    "form-action 'self' https://checkout.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ].join("; "),
};

// ── Honeypot trap paths — touching these = instant session ban ────────────────
// Bots probe for WordPress, PHPMyAdmin, env files, shells, backups.
// Real users never visit these. Touching one = automatically blocked.
const HONEYPOT_PREFIXES = [
  "/wp-admin", "/wp-login", "/wp-content", "/wordpress",
  "/phpmyadmin", "/pma", "/myadmin", "/mysql",
  "/.env", "/.git", "/.svn", "/.htaccess",
  "/config.php", "/configuration.php", "/web.config",
  "/backup", "/dump", "/db.sql", "/database",
  "/xmlrpc.php", "/cgi-bin", "/shell", "/cmd",
  "/upload.php", "/webshell", "/eval",
  "/etc/passwd", "/proc/self", "/var/www",
  "/admin/config", "/administrator",
  "/.well-known/acme-challenge/../",
];

// ── Known attack tool and headless-scraper User-Agent signatures ──────────────
// These patterns appear in automated scanning tools, not real browsers.
const BAD_UA_PATTERNS = [
  /python-requests/i,    // Python requests lib
  /python-urllib/i,
  /go-http-client/i,     // Go's default HTTP client (curl replacement for bots)
  /libwww-perl/i,
  /lwp-trivial/i,
  /curl\//i,             // Bare curl (real users use browsers)
  /wget\//i,
  /scrapy/i,
  /mechanize/i,
  /nikto/i,              // Vulnerability scanner
  /nmap/i,               // Network scanner
  /masscan/i,
  /sqlmap/i,             // SQL injection tool
  /dirbuster/i,          // Directory brute-forcer
  /dirb\b/i,
  /gobuster/i,
  /zgrab/i,
  /nuclei/i,             // Bug bounty scanner (also abused)
  /burpsuite/i,          // Burp Suite (pen testing tool)
  /acunetix/i,           // Web vulnerability scanner
  /nessus/i,
  /openvas/i,
  /havij/i,              // SQL injection tool
  /w3af/i,
  /hydra/i,              // Password brute-forcer
  /medusa\//i,
  /metasploit/i,
  /arachni/i,
  /skipfish/i,
  /vega\//i,
  /paros/i,
  /appscan/i,
  /websecurify/i,
];

// ── Rate limits: max requests per minute per IP per endpoint group ────────────
// These are tight because legitimate users don't hammer a single endpoint.
const RATE_LIMIT_RULES: Array<{ prefix: string; limit: number }> = [
  { prefix: "/api/checkout",       limit: 5  },  // Card-testing protection
  { prefix: "/api/guide-download", limit: 3  },  // Prevent PDF scraping
  { prefix: "/api/newsletter",     limit: 8  },  // Anti-spam
  { prefix: "/api/admin",          limit: 15 },
  { prefix: "/api/",              limit: 30 },
  { prefix: "/admin",             limit: 20 },
];
const WINDOW_MS = 60_000;

// ── In-process stores (live within a warm Edge instance) ─────────────────────
// Note: these reset on cold starts and are per-instance.
// For production-grade distributed rate limiting, add Upstash Redis.
const rateLimitStore = new Map<string, { hits: number; windowEnd: number }>();
const bannedIPs = new Set<string>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isBadUserAgent(ua: string): boolean {
  if (!ua || ua.length < 8) return true;
  return BAD_UA_PATTERNS.some((p) => p.test(ua));
}

function getRateLimitForPath(pathname: string): number {
  for (const rule of RATE_LIMIT_RULES) {
    if (pathname.startsWith(rule.prefix)) return rule.limit;
  }
  return 120;
}

function isRateLimited(ip: string, pathname: string): boolean {
  const limit = getRateLimitForPath(pathname);
  // Bucket key: IP + first 3 path segments (groups related endpoints)
  const bucket = `${ip}::${pathname.split("/").slice(0, 3).join("/")}`;
  const now = Date.now();
  const entry = rateLimitStore.get(bucket);

  if (!entry || now > entry.windowEnd) {
    rateLimitStore.set(bucket, { hits: 1, windowEnd: now + WINDOW_MS });
    return false;
  }

  entry.hits++;
  return entry.hits > limit;
}

function isHoneypotPath(pathname: string): boolean {
  const lower = pathname.toLowerCase();
  // Path traversal attempts
  if (lower.includes("..") || lower.includes("%2e%2e") || lower.includes("%252e")) {
    return true;
  }
  return HONEYPOT_PREFIXES.some((p) => lower.startsWith(p));
}

// Admin session: HMAC-SHA256(key=ADMIN_PASSWORD, data="veridian-admin-v1") as hex
async function computeAdminToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("veridian-admin-v1"));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function middleware(request: NextRequest) {
  const ip = getIP(request);
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const method = request.method;
  const isApi = pathname.startsWith("/api/");
  const isAdmin = pathname.startsWith("/admin");

  // 1. Banned IPs — hard block
  if (bannedIPs.has(ip)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Honeypot trap — ban the IP and return a convincing 404
  if (isHoneypotPath(pathname)) {
    bannedIPs.add(ip);
    return new NextResponse("Not Found", { status: 404 });
  }

  // 3. Bad User-Agent on API/admin routes — automated scanner fingerprinting
  if ((isApi || isAdmin) && isBadUserAgent(ua)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 4. Origin check on sensitive POST endpoints (CSRF + bot protection)
  //    Stripe webhooks are excluded — they legitimately have no Origin header.
  if (
    method === "POST" &&
    isApi &&
    !pathname.startsWith("/api/webhooks/")
  ) {
    const origin = request.headers.get("origin") || "";
    const ct = request.headers.get("content-type") || "";

    // Require content-type on POST (bots often skip it)
    if (!ct) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    // Require Origin to come from our domain (or be absent for same-origin same-tab fetches)
    if (
      origin &&
      !origin.startsWith("https://veridianclinic.com") &&
      !origin.startsWith("https://veridianclinic-") && // Vercel preview deployments
      !origin.startsWith("http://localhost")             // Local dev
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // 5. Rate limiting
  if (isRateLimited(ip, pathname)) {
    const limit = getRateLimitForPath(pathname);
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": String(limit),
        },
      }
    );
  }

  // 6. Admin route auth check
  if (isAdmin && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("__va")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!sessionCookie || !adminPassword) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expected = await computeAdminToken(adminPassword);
    if (!timingSafeEqual(sessionCookie, expected)) {
      const res = NextResponse.redirect(new URL("/admin/login", request.url));
      res.cookies.delete("__va");
      return res;
    }
  }

  // 7. Attach security headers to all responses
  const response = NextResponse.next();
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }
  return response;
}

export const config = {
  matcher: [
    // All routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.woff2?$).*)",
  ],
};
