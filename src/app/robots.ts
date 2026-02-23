import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Tous les bots : accès général autorisé
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // routes API jamais indexées
          "/_next/",        // fichiers internes Next.js
          "/studio/",       // Sanity Studio si accessible en prod
          "/admin/",
        ],
      },
      {
        // GPTBot (OpenAI) — bloquer si vous ne voulez pas que vos articles
        // servent à entraîner des modèles IA
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // CCBot (Common Crawl — utilisé pour entraîner des LLMs)
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        // Google Extended (Bard/Gemini training)
        userAgent: "Google-Extended",
        disallow: "/",
      },
    ],
    sitemap: "https://dossansdouleur.com/sitemap.xml",
    host: "https://dossansdouleur.com",
  };
}