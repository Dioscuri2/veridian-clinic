import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/book/thank-you",
        "/metabolic-reset-guide/thank-you",
        "/metabolic-quiz/thank-you",
      ],
    },
    sitemap: "https://veridianclinic.com/sitemap.xml",
    host: "https://veridianclinic.com",
  };
}
