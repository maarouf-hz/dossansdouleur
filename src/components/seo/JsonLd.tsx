// ─────────────────────────────────────────────────────────────────────────────
// Composants Schema.org pour Dos Sans Douleur
// Placez ce fichier dans : components/seo/JsonLd.tsx
//
// Utilisation :
//   - <WebSiteSchema />           → dans le layout.tsx (une seule fois)
//   - <ArticleSchema post={...} /> → dans la page article [post]/page.tsx
//   - <BreadcrumbSchema items={...}/> → dans les pages catégorie et article
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://dossansdouleur.com";
const SITE_NAME = "Dos Sans Douleur";

// ─── 1. WEBSITE SCHEMA ───────────────────────────────────────────────────────
// À ajouter dans layout.tsx — une seule fois pour tout le site
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: SITE_NAME,
        description:
          "Solutions naturelles et exercices thérapeutiques pour soigner le mal de dos.",
        inLanguage: "fr-FR",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        // Sitelinks searchbox — permet à Google d'afficher une barre de recherche
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`, // adaptez le chemin de votre logo
          width: 200,
          height: 60,
        },
        sameAs: [
          // Ajoutez vos réseaux sociaux si vous en avez
          // "https://www.facebook.com/dossansdouleur",
          // "https://www.instagram.com/dossansdouleur",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 2. ARTICLE SCHEMA ───────────────────────────────────────────────────────
// À ajouter dans [category]/[post]/page.tsx
// Google utilise MedicalWebPage pour les blogs santé → meilleure visibilité
interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  slug: string;
  categorySlug: string;
  readingTime?: number;
}

export function ArticleSchema({
  title,
  excerpt,
  publishedAt,
  updatedAt,
  imageUrl,
  slug,
  categorySlug,
  readingTime,
}: ArticleSchemaProps) {
  const articleUrl = `${BASE_URL}/${categorySlug}/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // MedicalWebPage — spécifique aux sites santé, booste le E-E-A-T
      {
        "@type": "MedicalWebPage",
        "@id": `${articleUrl}/#webpage`,
        url: articleUrl,
        name: title,
        description: excerpt,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: {
          "@type": "MedicalCondition",
          name: "Douleurs dorsales et vertébrales",
        },
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Patient",
        },
        medicalAudience: "Patient",
        lastReviewed: updatedAt || publishedAt,
        reviewedBy: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
        },
      },
      // Article — pour les rich snippets classiques
      {
        "@type": "Article",
        "@id": `${articleUrl}/#article`,
        headline: title,
        description: excerpt,
        url: articleUrl,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        inLanguage: "fr-FR",
        author: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: SITE_NAME,
        },
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        isPartOf: { "@id": `${articleUrl}/#webpage` },
        mainEntityOfPage: { "@id": `${articleUrl}/#webpage` },
        ...(imageUrl && {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 675,
          },
        }),
        ...(readingTime && {
          timeRequired: `PT${readingTime}M`,
        }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 3. BREADCRUMB SCHEMA ────────────────────────────────────────────────────
// À ajouter dans les pages catégorie et article
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: BASE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 4. FAQ SCHEMA ───────────────────────────────────────────────────────────
// Optionnel — à ajouter dans les articles qui contiennent une FAQ
// Permet d'afficher les questions/réponses directement dans Google
interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}