import type { MetadataRoute } from "next";

const siteUrl = "https://veridianclinic.com";

const staticRoutes = [
  "",
  "/assessments",
  "/blog",
  "/blog/apob-vs-ldl",
  "/blog/fast-insulin",
  "/blog/reversing-metabolic-syndrome",
  "/book",
  "/contact",
  "/cookies",
  "/discovery-call",
  "/executive-waitlist",
  "/intake",
  "/markers-guide",
  "/metabolic-age",
  "/metabolic-quiz",
  "/metabolic-quiz/scorecard",
  "/metabolic-reset-guide",
  "/metabolic-scorecard",
  "/privacy",
  "/quiz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("metabolic-quiz") ? 0.9 : 0.7,
  }));
}
