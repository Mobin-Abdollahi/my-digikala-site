import { Product } from "../types/product";

const baseProducts: Product[] = [
  {
    id: 1,
    title:
      "گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت",
    price: 42500000,
    image:
      "https://dkstatics-public.digikala.com/digikala-products/1cf6949666014382582772596956799059e0a0d9_1714400547.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/665f97984f18b31a5e128186f91f2495913e0078_1705650117.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/397b203c621815b3a4a34b2f29397682333534f3_1699351025.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/397b203c621815b3a4a34b2f29397682333534f3_1699351025.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/237b0292b34208e7583764ba896f6002d95e0c50_1653818815.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/237b0292b34208e7583764ba896f6002d95e0c50_1653818815.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/665f97984f18b31a5e128186f91f2495913e0078_1705650117.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/665f97984f18b31a5e128186f91f2495913e0078_1705650117.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
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

  // ✅ محصولات سوپرمارکتی (تعداد کمِ پایه؛ بعداً expand می‌شوند)
  {
    id: 1001,
    title: "نوشابه کولا 1.5 لیتری",
    price: 65000,
    image:
      "https://dkstatics-public.digikala.com/digikala-products/2d3db0b4ef8f3b7f2b4f2a0b7a0f0c9f.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/6d6b7d2a3c5f1a2c9e8d123456789abc.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/1f2e3d4c5b6a79808f9e0d1c2b3a4f5e.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/abc123abc123abc123abc123abc123ab.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/0aa1bb2cc3dd4ee5ff66778899aabbcc.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/ffeeddccbbaa99887766554433221100.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/11223344556677889900aabbccddeeff.jpg",
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
    image:
      "https://dkstatics-public.digikala.com/digikala-products/99887766554433221100ffeeddccbbaa.jpg",
    rating: 4.7,
    discount: 3,
    category: "سوپرمارکت",
    subcategory: "کالاهای اساسی",
    tags: ["new"],
    description: "برنج ایرانی خوش‌عطر مناسب مهمانی و مصرف روزانه.",
  },
];

function expandCategoryProducts(items: Product[], targetCount: number): Product[] {
  const grouped = items.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  let newId = Math.max(...items.map((item) => Number(item.id))) + 1;
  const finalProducts: Product[] = [];

  Object.values(grouped).forEach((categoryItems) => {
    const expanded: Product[] = [...categoryItems];

    let copyIndex = 1;
    while (expanded.length < targetCount) {
      const source =
        categoryItems[(expanded.length - categoryItems.length) % categoryItems.length];

      const cloned: Product = {
        ...source,
        id: newId++,
        title: `${source.title} - نسخه تست ${copyIndex}`,
        price: source.price + copyIndex * 1000,
        rating: Math.max(
          4,
          Number((source.rating - (copyIndex % 3) * 0.1).toFixed(1))
        ),
      };

      // ✅ تنوع در tagها (برای سوپرمارکت قشنگ‌تر می‌شود)
      if (source.category === "سوپرمارکت") {
        if (copyIndex % 4 === 0) cloned.tags = ["new"];
        if (copyIndex % 5 === 0) cloned.tags = ["bestSeller"];
        if (copyIndex % 7 === 0) cloned.tags = ["new", "bestSeller"];
      }

      expanded.push(cloned);
      copyIndex++;
    }

    finalProducts.push(...expanded);
  });

  return finalProducts;
}

export const products: Product[] = expandCategoryProducts(baseProducts, 20);
