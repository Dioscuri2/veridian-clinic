import type { MetadataRoute } from "next";

const siteUrl = "https://veridianclinic.com";

const staticRoutes = [
  "",
  "/about",
  "/assessments",
  "/metabolic-turnaround",
  "/blog",
  "/blog/apob-vs-ldl",
  "/blog/fast-insulin",
  "/blog/homocysteine",
  "/blog/lipoprotein-a-apob-triglycerides",
  "/blog/multivitamins",
  "/blog/omega-3",
  "/blog/reversing-metabolic-syndrome",
  "/blog/should-i-take-a-statin",
  "/blog/sulforaphane",
  "/blog/vigorous-exercise",
  "/blog/vitamin-d",
  "/blood-tests",
  "/blood-tests/apob",
  "/blood-tests/biological-age",
  "/blood-tests/cardiovascular-risk",
  "/blood-tests/fasting-insulin",
  "/blood-tests/fatigue-energy",
  "/blood-tests/lipoprotein-a",
  "/blood-tests/mens-testosterone",
  "/blood-tests/metabolic-screen",
  "/blood-tests/metabolic-weight",
  "/blood-tests/optimiser-baseline",
  "/blood-tests/womens-hormones",
  "/book",
  "/contact",
  "/cookies",
  "/discovery-call",
  "/executive-waitlist",
  "/markers-guide",
  "/metabolic-age",
  "/metabolic-scorecard",
  "/metabolic-quiz",
  "/metabolic-quiz/scorecard",
  "/metabolic-reset-guide",
  "/perimenopause-guide",
  "/perimenopause-quiz",
  "/privacy",
  "/quiz",
  "/terms",
  "/weight-loss",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("metabolic-quiz") ? 0.9 : route.startsWith("/blood-tests") ? 0.85 : 0.7,
  }));
}
