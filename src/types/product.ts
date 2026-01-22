export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  color: string;
  sizes: Size[];
  images: string[];
  description: string;
  fabric?: string;
  fit?: string;
  care?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  stock: number;
  mostBoughtSize?: string;
}

export interface Size {
  name: string;
  inStock: boolean;
  quantity: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  image: string;
  products: string[];
}
