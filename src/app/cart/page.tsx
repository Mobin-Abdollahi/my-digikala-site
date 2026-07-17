/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "../store/cart-context";
import { formatPrice } from "../utils/formatPrice";
import Link from "next/link";

export default function CartPage() {
  const { items, totalItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // محاسبه قیمت کل با در نظر گرفتن تعداد هر محصول
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // اگر سبد خرید خالی بود این بخش نمایش داده شود
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-6xl text-gray-300">🛒</div>
        <h2 className="text-xl font-bold text-gray-600">سبد خرید شما فعلاً خالی است!</h2>
        <Link href="/" className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600 transition-all">
          مشاهده جدیدترین کالاها
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <h1 className="mb-8 text-2xl font-bold border-b pb-4">سبد خرید شما</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* لیست محصولات موجود در سبد */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 max-w-[300px]">{item.title}</h3>
                  <p className="mt-2 text-red-600 font-bold">{formatPrice(item.price)} تومان</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 sm:mt-0">
                {/* کنترلر تعداد */}
                <div className="flex items-center gap-4 border rounded-xl px-3 py-1 bg-gray-50">
                  <button 
                    onClick={() => increaseQuantity(item.id)} 
                    className="text-2xl text-red-500 font-bold hover:scale-110 transition-transform"
                  >
                    +
                  </button>
                  <span className="text-lg font-medium w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    className="text-2xl text-red-500 font-bold hover:scale-110 transition-transform"
                  >
                    -
                  </button>
                </div>
                
                {/* دکمه حذف */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="حذف از سبد"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* بخش جمع کل و پرداخت */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 h-fit shadow-sm sticky top-24">
          <h2 className="mb-6 text-lg font-bold text-gray-700">خلاصه سفارش</h2>
          
          <div className="flex justify-between mb-4 text-gray-600">
            <span>تعداد کالاها</span>
            <span>{totalItems} عدد</span>
          </div>
          
          <div className="flex justify-between mb-6 text-gray-600">
            <span>جمع سبد خرید</span>
            <span>{formatPrice(totalPrice)} تومان</span>
          </div>
          
          <div className="my-4 border-t pt-4 flex justify-between font-bold text-xl text-red-600">
            <span>مبلغ قابل پرداخت</span>
            <span>{formatPrice(totalPrice)} تومان</span>
          </div>

          <button className="w-full rounded-xl bg-red-500 py-4 font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95">
            ثبت سفارش و ادامه
          </button>
          
          <p className="mt-4 text-[10px] text-gray-400 text-center">
            هزینه ارسال بر اساس آدرس شما در مراحل بعد محاسبه خواهد شد.
          </p>
        </div>
      </div>
    </div>
  );
}
