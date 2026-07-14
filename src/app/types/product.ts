export type Product = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discountPercent?: number;
  category: string;
};
