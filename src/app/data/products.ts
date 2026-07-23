import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت",
    price: 42500000,
    image: "https://dkstatics-public.digikala.com/digikala-products/1cf6949666014382582772596956799059e0a0d9_1714400547.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
    rating: 4.8,
    discount: 5,
    category: "موبایل",
    description: "آیفون ۱۳ با پردازنده قدرتمند A15 Bionic و سیستم دوربین دوگانه پیشرفته، یکی از محبوب‌ترین و پایدارترین گوشی‌های هوشمند بازار است. این نسخه با پارت نامبر CH از دو سیم‌کارت فیزیکی همزمان پشتیبانی می‌کند.",
    specs: [
      { label: "تراشه", value: "Apple A15 Bionic (5 nm)" },
      { label: "حافظه داخلی", value: "128 گیگابایت" },
      { label: "مقدار RAM", value: "4 گیگابایت" },
      { label: "اندازه صفحه نمایش", value: "6.1 اینچ" },
      { label: "پارت نامبر", value: "CH (دو سیم‌کارت فیزیکی)" }
    ]
  },
  {
    id: 2,
    title: "هدفون بی سیم سونی مدل WH-1000XM5",
    price: 18900000,
    image: "https://dkstatics-public.digikala.com/digikala-products/237b0292b34208e7583764ba896f6002d95e0c50_1653818815.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
    rating: 4.9,
    discount: 10,
    category: "لپ‌تاپ", // دسته‌بندی طبق دیتای اولیه شما
    description: "پرچمدار هدفون‌های سونی با پیشرفته‌ترین سیستم حذف نویز فعال (ANC) در دنیا. طراحی فوق‌العاده سبک، بازتولید صدای باکیفیت بالا و طول عمر باتری تا ۳۰ ساعت از ویژگی‌های کلیدی این محصول است.",
    specs: [
      { label: "نوع اتصال", value: "بی‌سیم (بلوتوث) و باسیم" },
      { label: "عمر باتری", value: "تا 30 ساعت با ANC روشن" },
      { label: "نسخه بلوتوث", value: "5.2" },
      { label: "قطر درایور", value: "30 میلی‌متر" },
      { label: "قابلیت‌های ویژه", value: "حذف نویز هوشمند، سنسور تشخیص قرارگیری روی گوش" }
    ]
  },
  {
    id: 3,
    title: "لپ تاپ 14 اینچی اپل مدل MacBook Pro MTL73 2023-M3",
    price: 89000000,
    image: "https://dkstatics-public.digikala.com/digikala-products/397b203c621815b3a4a34b2f29397682333534f3_1699351025.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
    rating: 4.7,
    category: "لوازم جانبی", // دسته‌بندی طبق دیتای اولیه شما
    description: "مک‌بوک پرو با تراشه نسل جدید M3 اپل عملکرد پردازشی فوق‌العاده سریعی را در کنار مصرف انرژی بسیار بهینه ارائه می‌دهد. صفحه نمایش Liquid Retina XDR این لپ‌تاپ تصاویری خیره‌کننده با دقت رنگ بالا تولید می‌کند.",
    discount: 0,
    specs: [
      { label: "سازنده پردازنده", value: "Apple M3 (8-Core CPU / 10-Core GPU)" },
      { label: "حافظه رم", value: "8 گیگابایت Unified Memory" },
      { label: "حافظه داخلی", value: "512 گیگابایت SSD" },
      { label: "اندازه صفحه نمایش", value: "14.2 اینچ" },
      { label: "نوع صفحه نمایش", value: "Liquid Retina XDR (120Hz)" }
    ],
  },
  {
    id: 4,
    title: "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم کارت ظرفیت 256 گیگابایت و رم 12 گیگابایت",
    price: 71000000,
    image: "https://dkstatics-public.digikala.com/digikala-products/665f97984f18b31a5e128186f91f2495913e0078_1705650117.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
    rating: 4.6,
    discount: 2,
    category: "ساعت هوشمند", // دسته‌بندی طبق دیتای اولیه شما
    description: "پرچمدار تمام‌عیار سامسونگ مجهز به فریم تیتانیومی، قلم استایلوس داخلی و هوش مصنوعی پیشرفته Galaxy AI. دوربین ۲۰۰ مگاپیکسلی این گوشی با زوم اپتیکال ارتقایافته، عکاسی موبایل را متحول کرده است.",
    specs: [
      { label: "تراشه", value: "Snapdragon 8 Gen 3 (4 nm)" },
      { label: "حافظه داخلی", value: "256 گیگابایت" },
      { label: "مقدار RAM", value: "12 گیگابایت" },
      { label: "دوربین اصلی", value: "200 + 50 + 12 + 10 مگاپیکسل" },
      { label: "جنس فریم", value: "تیتانیوم گرید 2" }
    ]
  }
];
