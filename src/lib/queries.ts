import { defineQuery } from "next-sanity";

export const homeArticlesQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[$start...$end]{
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "cate": category->title,
    "categorySlug": category->slug.current,
    "readingTime": round(length(pt::text(body)) / 5 / 200)
  }
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    headline,
    "count": count(*[_type == "post" && references(^._id)])
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ...,
    "category": category->{
      title,
      "slug": slug.current
    },
    "readingTime": coalesce(round(length(pt::text(body)) / 5 / 200), 5)
  }
`);

export const CATEGORY_QUERY = `*[_type == "category" && slug.current == $categorySlug][0] {
  title,
  headline,
  description,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    publishedAt,
    body,
    "readingTime": coalesce(round(length(pt::text(body)) / 5 / 200), 5)
  }
}`;

export const heroImageQuery = `*[_type == "heroImage"][0] {
  image { asset->{ url }, hotspot, crop },
  alt,
  affiliateUrl
}`