export interface Product {
  oldPrice?: number;
  id: string | number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;
  description?: string;
  specs?: { label: string; value: string }[];
  tags?: ("new" | "bestSeller")[];
  subcategory?: string;
}
