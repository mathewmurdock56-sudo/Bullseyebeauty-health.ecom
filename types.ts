export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  desc: string;
  image: string;
  stock: number;
  category: string;
  sku: string;
}

export interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
  verified: boolean;
  videoUrl?: string;
}

export interface Order {
  id: string;
  timestamp: string;
  product: string;
  quantity: number;
  price: number;
  name: string;
  phone: string;
  city: string;
  address: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface Reel {
  id: string;
  title: string;
  videoUrl: string;
  productId?: number;
}

export interface AppState {
  products: Product[];
  reels: Reel[];
  reviews: Review[];
  orders: Order[];
  wishlist: number[];
  aiQueries: { query: string; response: string }[];
  settings: {
    tickerText: string;
    discountPercentage: number;
  };
  stats: {
    revenue: number;
    orders: number;
    totalVisits: number;
    uniqueVisitors: string[];
  };
}
