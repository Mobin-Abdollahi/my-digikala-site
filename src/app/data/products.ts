// src/data/products.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  discount?: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    title: "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra",
    price: 65000000,
    image: "https://dkstat.com/dk-static/dg-products/1.jpg", // لینک فرضی
    discount: 5,
    rating: 4.8,
  },
  {
    id: 2,
    title: "لپ‌تاپ ۱۶ اینچی اپل مدل MacBook Pro M3",
    price: 120000000,
    image: "https://dkstat.com/dk-static/dg-products/2.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    title: "هدفون بی‌سیم سونی مدل WH-1000XM5",
    price: 15000000,
    image: "https://dkstat.com/dk-static/dg-products/3.jpg",
    discount: 10,
    rating: 4.7,
  },
  {
    id: 4,
    title: "ساعت هوشمند اپل مدل Series 9",
    price: 18500000,
    image: "https://dkstat.com/dk-static/dg-products/4.jpg",
    rating: 4.5,
  }
];
