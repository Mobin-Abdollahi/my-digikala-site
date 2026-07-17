// src/data/products.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  discount?: number;
  rating: number;
}

export const products = [
  {
      id: 1,
    title: "گوشی موبایل سامسونگ مدل S24 Ultra",
    price: 70000000,
    image: "https://dkstat.com/dk-static/dg-products/f793910c0e395460f789e5a7b7f16f5686049457_1705574542.jpg",
    rating: 4.5,
    discount: 10,
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
