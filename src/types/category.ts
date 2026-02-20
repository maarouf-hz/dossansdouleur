export type CategorySlug = 
  | 'dos-lombaires' 
  | 'cou-epaules' 
  | 'posture-ergonomie' 
  | 'remedes-naturels';

export interface Category {
  slug: CategorySlug;
  title: string;       
  description: string; 
  color: string;      
}