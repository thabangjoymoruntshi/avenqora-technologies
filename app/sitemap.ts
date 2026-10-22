import type { MetadataRoute } from "next";

const baseUrl = "https://avenqoratechnologies.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/discover",
    "/founder",
    "/projects/business-suite",
    "/projects/city-plumber",
    "/projects/floman",
    "/projects/it-support",
    "/projects/property-rental",
  ];

  return publicPages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
