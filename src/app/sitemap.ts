import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { works } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...works.map((w) => ({ url: `${SITE_URL}/works/${w.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
