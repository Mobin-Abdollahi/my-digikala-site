export interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // ✅ برای سوپرمارکت و بخش‌ها
  tags?: ("new" | "bestSeller")[];
  subcategory?: string; // مثل: نوشیدنی، لبنیات، تنقلات...
}
