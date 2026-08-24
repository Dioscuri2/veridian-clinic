/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["stripe"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    domains: [],
  },
  outputFileTracingIncludes: {
    "/api/guide-download": ["./private/**/*"],
  },
  async redirects() {
    return [
      // Energy Screen (£195) retired 2026-08-21, collapsed into the £249
      // Energy & Fatigue panel. Permanent redirect preserves SEO equity.
      {
        source: "/blood-tests/metabolic-screen",
        destination: "/blood-tests/fatigue-energy",
        permanent: true,
      },
      // Short URL for print. Leaflets and QR codes use veridianclinic.com/gp
      // because a printed address has to be short enough to retype by hand.
      // Query strings are forwarded, so /gp?c=ph carries the campaign tag
      // through to analytics. Temporary, so the short URL stays reusable.
      {
        source: "/gp",
        destination: "/gp-consultations",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/linkedin-cards/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

module.exports = nextConfig;
