import { POST_QUERY } from "@/lib/queries";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

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

  // ✅ IMAGE BUILDER (your requested version)
  const postImg = post.mainImage ? urlFor(post.mainImage) : null;

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 pt-20">
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
    </main>
  );
}