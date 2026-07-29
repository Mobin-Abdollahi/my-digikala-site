export interface Product {
  id: string | number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;

  description?: string;
  specs?: { label: string; value: string }[];

  // ✅ برای سوپرمارکت و بخش‌ها
  tags?: ("new" | "bestSeller")[];
  subcategory?: string; // مثل: نوشیدنی، لبنیات، تنقلات...
}
