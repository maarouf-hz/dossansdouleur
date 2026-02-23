import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE_URL = "https://dossansdouleur.com";

// Récupère tous les articles publiés depuis Sanity
async function getAllPosts() {
  return client.fetch<{ slug: string; category: string; updatedAt: string }[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      "slug": slug.current,
      "category": category->slug.current,
      "updatedAt": coalesce(_updatedAt, publishedAt)
    }`
  );
}

// Récupère toutes les catégories depuis Sanity
async function getAllCategories() {
  return client.fetch<{ slug: string; updatedAt: string }[]>(
    `*[_type == "category" && defined(slug.current)] {
      "slug": slug.current,
      "updatedAt": coalesce(_updatedAt, now())
    }`
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  // Pages statiques prioritaires
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Pages légales — faible priorité
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/conditions-utilisation`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  // Pages catégories
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Pages articles
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.category}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}