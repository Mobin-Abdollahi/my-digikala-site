export interface Product {
  id: string | number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  discount?: number; // علامت سوال یعنی اختیاری است
  description?: string; // اضافه شد
  specs?: { label: string; value: string }[]; // اضافه شد
}
