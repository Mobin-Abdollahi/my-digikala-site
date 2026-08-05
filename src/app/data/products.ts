import type { Product } from "../types/product";

export const baseProducts: Product[] = [
  {
    id: 1,
    title:
      "گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت",
    price: 42500000,
    image: "/images/products/iphone-13.jpg",
    rating: 4.8,
    discount: 5,
    category: "موبایل",
    description:
      "آیفون ۱۳ با پردازنده A15 Bionic، طراحی پریمیوم و عملکرد پایدار، یکی از محبوب‌ترین گوشی‌های اپل است.",
    specs: [
      { label: "تراشه", value: "Apple A15 Bionic" },
      { label: "حافظه داخلی", value: "128 گیگابایت" },
      { label: "رم", value: "4 گیگابایت" },
      { label: "اندازه نمایشگر", value: "6.1 اینچ" },
      { label: "نوع سیم‌کارت", value: "دو سیم‌کارت" },
    ],
  },
  {
    id: 2,
    title:
      "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم کارت ظرفیت 256 گیگابایت و رم 12 گیگابایت",
    price: 71000000,
    image: "/images/products/galaxy-s24-ultra.jpg",
    rating: 4.9,
    discount: 2,
    category: "موبایل",
    description:
      "پرچمدار قدرتمند سامسونگ با دوربین 200 مگاپیکسلی، قلم S Pen و نمایشگر بسیار باکیفیت.",
    specs: [
      { label: "تراشه", value: "Snapdragon 8 Gen 3" },
      { label: "حافظه داخلی", value: "256 گیگابایت" },
      { label: "رم", value: "12 گیگابایت" },
      { label: "دوربین اصلی", value: "200 مگاپیکسل" },
      { label: "نمایشگر", value: "Dynamic AMOLED 2X" },
    ],
  },
  {
    id: 9,
    title: "لپ تاپ 14 اینچی اپل مدل MacBook Pro M3 2023",
    price: 89000000,
    image: "/images/products/macbook-pro-m3.jpg",
    rating: 4.8,
    discount: 0,
    category: "لپ‌تاپ",
    description: "مک‌بوک پرو M3 با قدرت پردازشی بالا، نمایشگر XDR و شارژدهی عالی.",
    specs: [
      { label: "پردازنده", value: "Apple M3" },
      { label: "رم", value: "8 گیگابایت" },
      { label: "حافظه", value: "512 گیگابایت SSD" },
      { label: "نمایشگر", value: "14.2 اینچ" },
      { label: "نوع پنل", value: "Liquid Retina XDR" },
    ],
  },
  {
    id: 10,
    title: "لپ تاپ 15.6 اینچی ایسوس مدل TUF Gaming F15",
    price: 63500000,
    image: "/images/products/asus-tuf-f15.jpg",
    rating: 4.6,
    discount: 9,
    category: "لپ‌تاپ",
    description:
      "لپ‌تاپ گیمینگ ایسوس با طراحی مقاوم، خنک‌کنندگی مناسب و سخت‌افزار قدرتمند.",
    specs: [
      { label: "پردازنده", value: "Core i7" },
      { label: "گرافیک", value: "RTX 4060" },
      { label: "رم", value: "16 گیگابایت" },
      { label: "حافظه", value: "1 ترابایت SSD" },
      { label: "نمایشگر", value: "144Hz" },
    ],
  },
  {
    id: 17,
    title: "هدفون بی سیم سونی مدل WH-1000XM5",
    price: 18900000,
    image: "/images/products/sony-wh1000xm5.jpg",
    rating: 4.9,
    discount: 10,
    category: "لوازم جانبی",
    description: "هدفون پرچمدار سونی با حذف نویز حرفه‌ای و کیفیت صدای فوق‌العاده.",
    specs: [
      { label: "نوع اتصال", value: "بی‌سیم و باسیم" },
      { label: "بلوتوث", value: "5.2" },
      { label: "باتری", value: "تا 30 ساعت" },
      { label: "ویژگی خاص", value: "ANC" },
      { label: "کاربری", value: "موسیقی / تماس" },
    ],
  },
  {
    id: 18,
    title: "ایرپاد اپل مدل AirPods Pro نسل 2",
    price: 16400000,
    image: "/images/products/airpods-pro-2.jpg",
    rating: 4.8,
    discount: 6,
    category: "لوازم جانبی",
    description:
      "ایرپاد پرو نسل دوم با نویزکنسلینگ عالی و هماهنگی بی‌نقص با اکوسیستم اپل.",
    specs: [
      { label: "نوع", value: "TWS" },
      { label: "ویژگی خاص", value: "ANC / Transparency" },
      { label: "شارژ", value: "USB-C" },
      { label: "مقاومت", value: "IPX4" },
      { label: "کاربری", value: "روزمره / تماس" },
    ],
  },
  {
    id: 25,
    title: "ساعت هوشمند اپل مدل Apple Watch Series 9 45mm",
    price: 29800000,
    image: "/images/products/apple-watch-series-9.jpg",
    rating: 4.8,
    discount: 4,
    category: "ساعت هوشمند",
    description: "اپل واچ سری 9 با سنسورهای دقیق سلامتی و هماهنگی کامل با آیفون.",
    specs: [
      { label: "اندازه", value: "45 میلی‌متر" },
      { label: "مقاومت", value: "ضدآب" },
      { label: "سنسورها", value: "ضربان قلب / اکسیژن خون" },
      { label: "اتصال", value: "Bluetooth / GPS" },
      { label: "سازگاری", value: "iPhone" },
    ],
  },
  {
    id: 26,
    title: "ساعت هوشمند سامسونگ مدل Galaxy Watch 6 Classic",
    price: 15400000,
    image: "/images/products/galaxy-watch-6-classic.jpg",
    rating: 4.6,
    discount: 6,
    category: "ساعت هوشمند",
    description:
      "ساعت هوشمند سامسونگ با طراحی کلاسیک، نمایشگر باکیفیت و امکانات سلامتی کامل.",
    specs: [
      { label: "نمایشگر", value: "Super AMOLED" },
      { label: "سیستم عامل", value: "Wear OS" },
      { label: "مقاومت", value: "IP68" },
      { label: "سنسورها", value: "ECG / ضربان قلب" },
      { label: "سازگاری", value: "Android" },
    ],
  },
  {
    id: 1001,
    title: "نوشابه کولا 1.5 لیتری",
    price: 65000,
    image: "/images/products/cola.jpg",
    rating: 4.4,
    discount: 10,
    category: "سوپرمارکت",
    subcategory: "نوشیدنی",
    tags: ["bestSeller"],
    description: "نوشابه گازدار با طعم کولا، مناسب مصرف روزانه.",
  },
  {
    id: 1002,
    title: "آب معدنی 1.5 لیتری",
    price: 18000,
    image: "/images/products/water.jpg",
    rating: 4.6,
    discount: 0,
    category: "سوپرمارکت",
    subcategory: "نوشیدنی",
    tags: ["new"],
    description: "آب معدنی سبک و مناسب برای مصرف روزانه.",
  },
  {
    id: 1003,
    title: "شیر کم چرب 1 لیتری",
    price: 52000,
    image: "/images/products/milk.jpg",
    rating: 4.7,
    discount: 5,
    category: "سوپرمارکت",
    subcategory: "لبنیات",
    tags: ["bestSeller"],
    description: "شیر کم‌چرب پاستوریزه، مناسب صبحانه و رژیم غذایی.",
  },
  {
    id: 1004,
    title: "ماست پرچرب 900 گرمی",
    price: 98000,
    image: "/images/products/yogurt.jpg",
    rating: 4.5,
    discount: 0,
    category: "سوپرمارکت",
    subcategory: "لبنیات",
    tags: ["new"],
    description: "ماست پرچرب با بافت خامه‌ای، مناسب کنار غذا.",
  },
  {
    id: 1005,
    title: "چیپس سیب زمینی خانواده",
    price: 74000,
    image: "/images/products/chips.jpg",
    rating: 4.3,
    discount: 12,
    category: "سوپرمارکت",
    subcategory: "تنقلات",
    tags: ["bestSeller"],
    description: "چیپس ترد و خوش‌طعم مناسب دورهمی.",
  },
  {
    id: 1006,
    title: "شکلات تخته‌ای 100 گرمی",
    price: 89000,
    image: "/images/products/chocolate.jpg",
    rating: 4.8,
    discount: 8,
    category: "سوپرمارکت",
    subcategory: "تنقلات",
    tags: ["new", "bestSeller"],
    description: "شکلات تخته‌ای با طعم غنی و کیفیت بالا.",
  },
  {
    id: 1007,
    title: "روغن مایع سرخ کردنی 1.8 لیتری",
    price: 245000,
    image: "/images/products/oil.jpg",
    rating: 4.4,
    discount: 0,
    category: "سوپرمارکت",
    subcategory: "کالاهای اساسی",
    tags: ["bestSeller"],
    description: "روغن سرخ‌کردنی مناسب پخت و پز روزانه.",
  },
  {
    id: 1008,
    title: "برنج ایرانی 5 کیلوگرمی",
    price: 890000,
    image: "/images/products/rice.jpg",
    rating: 4.7,
    discount: 3,
    category: "سوپرمارکت",
    subcategory: "کالاهای اساسی",
    tags: ["new"],
    description: "برنج ایرانی خوش‌عطر مناسب مهمانی و مصرف روزانه.",
  },
];
function duplicateProducts(
  items: Product[],
  copiesPerProduct: number
): Product[] {
  const maxId = Math.max(
    ...items.map((item) => {
      const numericId = Number(item.id);
      return Number.isFinite(numericId) ? numericId : 0;
    })
  );

  let nextId = maxId + 1;

  return items.flatMap((product) => {
    return Array.from({ length: copiesPerProduct }, (_, copyIndex) => {
      // نسخه اول همان محصول اصلی است
      if (copyIndex === 0) {
        return product;
      }

      const copyNumber = copyIndex + 1;

      const duplicate: Product = {
        ...product,
        id: nextId++,
        title: `${product.title} - نسخه ${copyNumber}`,
        price: product.price + copyIndex * 1000,
        rating: Math.max(
          1,
          Number(
            Math.min(
              5,
              product.rating - (copyIndex % 3) * 0.1
            ).toFixed(1)
          )
        ),
      };

      // تغییر جزئی تگ محصولات سوپرمارکت
      if (product.category === "سوپرمارکت") {
        if (copyIndex % 7 === 0) {
          duplicate.tags = ["new", "bestSeller"];
        } else if (copyIndex % 5 === 0) {
          duplicate.tags = ["bestSeller"];
        } else if (copyIndex % 3 === 0) {
          duplicate.tags = ["new"];
        }
      }

      return duplicate;
    });
  });
}

export const products: Product[] = duplicateProducts(baseProducts, 10);



