import { CategorySlug } from "./category";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;        
  content: string;        
  publishedAt: string;    
  updatedAt: string;
  categorySlug: CategorySlug;
  mainImage: {
    url: string;
    alt: string;
  };
  readingTime: number;    
  isVerifiedContent: boolean; 
}