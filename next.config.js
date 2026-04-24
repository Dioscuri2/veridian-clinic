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
};

module.exports = nextConfig;
