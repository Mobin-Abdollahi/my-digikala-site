export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand?: string;    // علامت سوال اضافه شد
  discount?: number; // علامت سوال اضافه شد
  image?: string;
  category: string;
}
