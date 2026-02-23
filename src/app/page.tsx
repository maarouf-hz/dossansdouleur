import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { categoriesQuery, heroImageQuery, homeArticlesQuery } from "@/lib/queries";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
import { HeroImageContent } from "@/components/ui/hero-image-content";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://dossansdouleur.com" },
};

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ?createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

async function getCategories() {
  return await client.fetch(categoriesQuery);
}

async function getHeroImage() {
  return await client.fetch(heroImageQuery);
}

async function getArticles(page = 1, limit = 8) {
  const start = (page - 1) * limit;
  const end = start + limit +1;
  return await client.fetch(homeArticlesQuery, { start, end });
}

export default async function Home({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page || 1);
  if (page === 1 && resolvedSearchParams?.page !== undefined) {
    redirect("/");
  }
  const [heroData, categories, articles] = await Promise.all([
    getHeroImage(),
    getCategories(),
    getArticles(page, 8),
  ]);

  // Hero image URL — uses the same urlFor defined above (was "urlForImage" before = bug)
  const heroImageUrl = heroData?.image
    ? urlFor(heroData.image)?.auto("format").url()
    : null;

  const cardColors = [
    "bg-emerald-50",
    "bg-slate-50",
    "bg-emerald-50",
    "bg-slate-50",
  ];

  // Pagination: hide "Next" if fewer than 8 articles returned (last page)
  const hasNextPage = articles.length > 8;
  const displayedArticles = articles.slice(0, 8);

  return (
    <div className="flex flex-col gap-16 pb-16">

      {/* SECTION HERO */}
      <section className="container mx-auto px-4 pt-12 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-slate-100">
          <div className="space-y-6">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
              Expertise Santé Vertébrale
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic">
              Soulager votre <br />
              <span className="text-emerald-600 italic">Mal de Dos</span> <br />
              naturellement.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Découvrez des guides complets sur la <strong>posture</strong>, les{" "}
              <strong>remèdes naturels</strong> et des exercices ciblés pour dire
              adieu aux douleurs lombaires et cervicales.
            </p>
          </div>

          {heroData?.affiliateUrl ? (
            <Link
              href={heroData.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label={heroData.alt ?? "Image à la Une"}
              className="relative aspect-square w-full max-h-[300px] overflow-hidden group block"
            >
              <HeroImageContent
                imageUrl={heroImageUrl}
                alt={heroData.alt}
                showBadge={true}
              />
            </Link>
          ) : (
            <div className="relative aspect-square w-full max-h-[300px] overflow-hidden group">
              <HeroImageContent
                imageUrl={heroImageUrl}
                alt={heroData?.alt}
                showBadge={false}
              />
            </div>
          )}
        </div>
      </section>

      {/* SECTION DERNIERS ARTICLES */}
      <section className="container mx-auto px-4 md:px-8 border-t pt-16 border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">
              Dernières <span className="text-emerald-600">Actualités Santé</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Nos conseils récents pour prendre soin de votre colonne vertébrale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedArticles.map((post: any) => {
            const postImg = post.mainImage ? urlFor(post.mainImage) : null;
            return (
              <Link
                key={post.slug}
                 href={`/${post.categorySlug}/${post.slug}`}
                className="group cursor-pointer block"
              >
                <article className="">
                  <div className="relative aspect-video mb-4 overflow-hidden bg-slate-100">
                    {postImg && (
                      <Image
                        src={postImg.width(800).auto("format").url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-0 left-0 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                      {post.cate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="pt-2 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime} min de lecture</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Pagination — Previous only if page > 1, Next only if more articles exist */}
        <div className="flex justify-center gap-4 mt-12">
          {page > 1 && (
            <Link
              href={`/?page=${page - 1}`}
              className="px-6 py-2 border font-bold uppercase hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              ← Précédent
            </Link>
          )}
          {hasNextPage && (
            <Link
              href={`/?page=${page + 1}`}
              className="px-6 py-2 border font-bold uppercase hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              Suivant →
            </Link>
          )}
        </div>
      </section>

      {/* SECTION CATÉGORIES */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">
            Nos piliers de santé
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat: any, i: number) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`${cardColors[i % cardColors.length]} p-8 border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer`}
            >
              <h3 className="font-black uppercase text-xl mb-2 group-hover:text-emerald-600">
                {cat.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6">{cat.headline}</p>
              <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-500">
                Découvrir les {cat.count} articles
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION WHY US */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 italic">
            Pourquoi faire confiance à{" "}
            <span className="text-emerald-500">Dos Sans Douleur</span> ?
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 italic">
            "Notre mission est de vulgariser les études scientifiques sur la
            colonne vertébrale pour vous offrir des solutions concrètes et simples
            à appliquer chez vous."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-3xl font-black text-emerald-500 mb-2">100%</div>
              <p className="text-xs uppercase font-bold tracking-widest">
                Conseils Naturels
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-emerald-500 mb-2">+50</div>
              <p className="text-xs uppercase font-bold tracking-widest">
                Exercices
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-emerald-500 mb-2">Expert</div>
              <p className="text-xs uppercase font-bold tracking-widest">
                Contenu Vérifié
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}