"use client";
import { useCart } from "../store/cart-context";
import { formatPrice } from "../utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFinalPayment = () => {
    // شبیه‌سازی فرآیند پرداخت
    toast.success("سفارش شما با موفقیت ثبت شد!");
    clearCart(); // خالی کردن سبد خرید بعد از موفقیت
    router.push("/"); // هدایت به صفحه اصلی
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-20" dir="rtl">
        <h2 className="text-xl font-bold mb-4">سبد خرید شما خالی است</h2>
        <Link href="/" className="text-blue-500 underline">بازگشت به فروشگاه</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <h1 className="mb-8 text-2xl font-bold">جزئیات پرداخت و ارسال</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* بخش فرم اطلاعات گیرنده */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-700 border-b pb-2">اطلاعات گیرنده</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">نام و نام خانوادگی</label>
                <input type="text" className="w-full rounded-lg border p-2 outline-none focus:border-red-500" placeholder="مثلا: علی علوی" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">شماره تماس</label>
                <input type="text" className="w-full rounded-lg border p-2 outline-none focus:border-red-500" placeholder="09123456789" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">آدرس دقیق</label>
                <textarea className="w-full rounded-lg border p-2 outline-none focus:border-red-500" rows={3} placeholder="استان، شهر، خیابان..." />
              </div>
            </div>
          </div>

          {/* لیست مختصر کالاها */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-700 border-b pb-2">مرور کالاها</h2>
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                <Image src={item.image} alt={item.title} width={50} height={50} className="object-contain" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.quantity} عدد</p>
                </div>
                <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)} تومان</span>
              </div>
            ))}
          </div>
        </div>

        {/* فاکتور نهایی */}
        <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm sticky top-24">
          <h2 className="mb-6 text-lg font-bold text-gray-700">خلاصه فاکتور</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">جمع کل کالاها:</span>
            <span>{formatPrice(totalPrice)} تومان</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">هزینه ارسال:</span>
            <span className="text-green-600">رایگان</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-xl text-red-600">
            <span>مبلغ نهایی:</span>
            <span>{formatPrice(totalPrice)} تومان</span>
          </div>
          <button 
            onClick={handleFinalPayment}
            className="w-full mt-6 rounded-xl bg-red-500 py-4 font-bold text-white hover:bg-red-600 transition-all"
          >
            پرداخت و ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
