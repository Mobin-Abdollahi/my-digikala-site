export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
  subcategory?: string;
  rating: number;
  description?: string;
  specs?: {
    label: string;
    value: string;
  }[];
  tags?: string[];
}
