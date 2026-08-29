export type ProductType = 'E-book' | 'Template' | 'AI Prompt' | 'Course' | 'Software' | 'Graphics';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: Seller;
  category: string;
  productType: ProductType;
  tags: string[];
  rating: number;
  reviews: number;
  views: number;
  saves: number;
  createdAt: string;
  featured?: boolean;
}

export type NavTab = 'home' | 'explore' | 'market' | 'library' | 'profile';

export interface ToastMessage {
  id: string;
  title: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}
