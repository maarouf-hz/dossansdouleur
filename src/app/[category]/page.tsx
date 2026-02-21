import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { CATEGORY_QUERY, categoryPostsCountQuery } from "@/lib/queries";

const LIMIT = 9;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam || 1);
  if (page === 1 && pageParam !== undefined) {
    redirect(`/${categorySlug}`);
  }
  const start = (page - 1) * LIMIT;
  const end = start + LIMIT;

  const [data, totalCount] = await Promise.all([
    client.fetch<SanityDocument>(
      CATEGORY_QUERY,
      { categorySlug, start, end },
      { next: { revalidate: 30 } }
    ),
    client.fetch<number>(
      categoryPostsCountQuery,
      { categorySlug },
      { next: { revalidate: 30 } }
    ),
  ]);

  if (!data) notFound();

  const hasNextPage = page * LIMIT < totalCount;
  const hasPrevPage = page > 1;

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">Accueil</Link> / {data.title}
          </nav>
          <h1 className="text-6xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] mb-10">
            {data.title}
          </h1>
          <p className="max-w-2xl text-xl md:text-3xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            {data.headline}
          </p>
        </div>
      </header>

      {/* LISTE DES ARTICLES */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-16">
          {data.posts?.map((post: any, index: number) => {
            const isFeatured = index === 0 && page === 1;
            const postImg = post.mainImage ? urlFor(post.mainImage) : null;

            return (
              <Link
                key={post.slug}
                href={`/${categorySlug}/${post.slug}`}
                className={`group flex flex-col ${isFeatured ? "md:col-span-12 lg:col-span-9 mb-12" : "md:col-span-6 lg:col-span-4"}`}
              >
                <article className={`${isFeatured ? "md:grid md:grid-cols-5 md:gap-12" : "flex flex-col"}`}>
                  <div className={`relative overflow-hidden bg-slate-100 mb-8 border border-slate-200 ${isFeatured ? "md:col-span-3 aspect-[16/10]" : "aspect-video"}`}>
                    {postImg && (
                      <Image
                        src={postImg.width(800).auto("format").url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    {isFeatured && (
                      <div className="absolute top-0 left-0 bg-emerald-600 text-white text-[12px] font-bold px-2 py-1 uppercase tracking-tighter">
                        Dernier article
                      </div>
                    )}
                  </div>

                  <div className={isFeatured ? "md:col-span-2 flex flex-col justify-center" : ""}>
                    <h2 className={`font-black uppercase tracking-tighter leading-[0.9] group-hover:text-emerald-700 transition-colors ${isFeatured ? "text-5xl md:text-7xl mb-8" : "text-3xl mb-4"}`}>
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg line-clamp-3 mb-8 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span className="bg-black text-white px-2 py-1">{post.readingTime || 5} MIN</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </article>
                {isFeatured && <div className="hidden md:block w-full h-px bg-slate-200 mt-20" />}
              </Link>
            );
          })}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-20 border-t border-slate-100 pt-12">
          {hasPrevPage && (
            <Link
              href={`/${categorySlug}?page=${page - 1}`}
              className="px-6 py-2 border font-bold uppercase hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              ← Précédent
            </Link>
          )}
          {hasNextPage && (
            <Link
              href={`/${categorySlug}?page=${page + 1}`}
              className="px-6 py-2 border font-bold uppercase hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              Suivant →
            </Link>
          )}
        </div>
      </section>

      {/* DESCRIPTION SEO */}
      {data.description && (
        <section className="bg-slate-900 text-white py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <h3 className="text-2xl font-black uppercase italic mb-10 border-b border-emerald-500 pb-4 inline-block">
              Focus Anatomique : {data.title}
            </h3>
            <div className="prose prose-invert prose-emerald max-w-none text-slate-400 text-lg leading-loose">
              {data.description}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}