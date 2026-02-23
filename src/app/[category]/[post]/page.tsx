import { POST_QUERY } from "@/lib/queries";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { generateArticleMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: {params: Promise<{ category: string; post: string }>}) {
  const { post: slug, category } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  const postImg = post.mainImage ? urlFor(post.mainImage)?.width(1200).height(630).url() : undefined;

  return generateArticleMetadata({
    title: post.title,
    description: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post._updatedAt,
    imageUrl: postImg ?? undefined,
    categorySlug: category,
    slug,
  });
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; post: string }>; // Change 'slug' to 'post'
}) {
  const resolvedParams = await params;
  
  // Destructure 'post' because that is what your folder [post] provides
  const { post: slug, category } = resolvedParams; 

  if (!slug) {
    console.error("No slug found in URL params");
    return <div>Missing Slug</div>;
  }

  const post = await client.fetch(
    POST_QUERY,
    { slug }, // This stays as 'slug' because your GROQ uses $slug
    { next: { revalidate: 60 } }
  );

  const postImg = post.mainImage ? urlFor(post.mainImage) : null;

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 pt-20">
      {/* Schemas JSON-LD */}
      <ArticleSchema
        title={post.title}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        updatedAt={post._updatedAt}
        imageUrl={postImg?.width(1200).height(675).url()}
        slug={slug}
        categorySlug={category}
        readingTime={post.readingTime}
      />
      <BreadcrumbSchema
        items={[
          { name: category, url: `https://dossansdouleur.com/${category}` },
          { name: post.title, url: `https://dossansdouleur.com/${category}/${slug}` },
        ]}
      />
      <nav className="mb-8 text-xs font-black uppercase tracking-widest text-emerald-600">
        <Link href="/">Accueil</Link>
        <span className="mx-2 text-slate-300">/</span>
        <Link href={`/${category}`}>{category}</Link>
      </nav>

      <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-10">
        {post.title}
      </h1>

      {/* IMAGE */}
      {postImg && (
        <div className="relative aspect-video mb-12 overflow-hidden rounded-sm shadow-xl">
          <Image
            src={postImg.width(1200).height(675).url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <article className="prose prose-lg md:prose-xl max-w-none">
        <div className="flex items-center gap-4 mb-8 text-[10px] font-bold uppercase text-slate-400 border-b pb-4">
          <span>
            Publié le {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
          </span>
          <span>•</span>
          <span className="text-black">
            {post.readingTime || 5} MIN DE LECTURE
          </span>
        </div>

        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </article>
      {/* DISCLAIMER */}
      <div className="mt-16 border-l-4 border-amber-400 bg-amber-50 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-2">
          ⚠️ Avertissement médical
        </p>
        <p className="text-sm text-amber-800 leading-relaxed">
          Les informations contenues dans cet article sont fournies à titre informatif et éducatif uniquement. 
          Elles ne constituent pas un avis médical et ne remplacent en aucun cas une consultation avec un 
          professionnel de santé qualifié (médecin, kinésithérapeute, ostéopathe). En cas de douleur 
          persistante ou intense, consultez un médecin avant d'entreprendre tout exercice ou traitement.
        </p>
      </div>

      {/* SOURCES */}
      {post.references?.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Sources & Références
          </h2>
          <ul className="space-y-2">
            {post.references.map((ref: any, i: number) => (
              <li key={i} className="text-sm text-slate-500">
                <Link
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 underline underline-offset-2"
                >
                  {ref.title}
                </Link>
                <span className="ml-2 text-slate-400">
                  — {ref.source}{ref.publishedYear ? `, ${ref.publishedYear}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}