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
