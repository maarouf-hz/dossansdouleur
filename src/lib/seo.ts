// ─────────────────────────────────────────────────────────────────────────────
// lib/seo.ts — Générateur de métadonnées SEO centralisé
// Placez ce fichier dans : lib/seo.ts
//
// Utilisation dans chaque page :
//   import { generatePageMetadata, generateArticleMetadata } from "@/lib/seo";
//   export const metadata = generatePageMetadata({ ... });
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

const BASE_URL = "https://dossansdouleur.com";
const SITE_NAME = "Dos Sans Douleur";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`; // 1200x630px

// ─── Pages statiques ─────────────────────────────────────────────────────────
export function generatePageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    }),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ─── Articles dynamiques ─────────────────────────────────────────────────────
export function generateArticleMetadata({
  title,
  description,
  publishedAt,
  updatedAt,
  imageUrl,
  categorySlug,
  slug,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  categorySlug: string;
  slug: string;
}): Metadata {
  const url = `${BASE_URL}/${categorySlug}/${slug}`;
  const ogImage = imageUrl || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Articles de santé — toujours indexés
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: [BASE_URL],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

// ─── Catégories dynamiques ───────────────────────────────────────────────────
export function generateCategoryMetadata({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const url = `${BASE_URL}/${slug}`;

  return {
    title: `${title} — Conseils & Guides`,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

// ─── Métadonnées pour pages légales (noindex) ────────────────────────────────
export const legalPagesMetadata = {
  mentionsLegales: generatePageMetadata({
    title: "Mentions Légales",
    description: "Mentions légales obligatoires du site Dos Sans Douleur.",
    path: "/mentions-legales",
    noIndex: true,
  }),
  confidentialite: generatePageMetadata({
    title: "Politique de Confidentialité",
    description: "Politique de confidentialité et protection des données personnelles.",
    path: "/politique-de-confidentialite",
    noIndex: true,
  }),
  conditions: generatePageMetadata({
    title: "Conditions d'Utilisation",
    description: "Conditions générales d'utilisation du site Dos Sans Douleur.",
    path: "/conditions-utilisation",
    noIndex: true,
  }),
  contact: generatePageMetadata({
    title: "Contact",
    description: "Contactez l'équipe de Dos Sans Douleur pour toute question.",
    path: "/contact",
    noIndex: false, // contact page DOIT être indexée
  }),
  aPropos: generatePageMetadata({
    title: "À Propos",
    description:
      "Découvrez la mission de Dos Sans Douleur : vous aider à vivre sans douleur dorsale grâce à des informations fiables.",
    path: "/a-propos",
    noIndex: false, // À propos DOIT être indexée — crucial pour E-E-A-T santé
  }),
};