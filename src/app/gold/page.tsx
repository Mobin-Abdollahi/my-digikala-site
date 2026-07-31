/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  Wallet,
  TrendingUp,
  ChevronLeft,
  Sparkles,
  Info,
  X,
} from "lucide-react";

import GoldPriceChart from "../components/gold/GoldPriceChart";
import MobileAnimation from "../components/gold/MobileAnimation";
import { useAuth } from "../store/auth-context";

const GOLD_PRICE_PER_GRAM = 7450000;
const QUICK_AMOUNTS = [0.5, 1, 2, 5];

const features = [
  {
    title: "امکان خرید طلا",
    description: "به مقدار دلخواه",
    icon: <Sparkles size={24} />,
  },
  {
    title: "حفظ ارزش سرمایه",
    description: "در برابر تورم",
    icon: <TrendingUp size={24} />,
  },
  {
    title: "حذف ریسک نگهداری",
    description: "طلای فیزیکی",
    icon: <ShieldCheck size={24} />,
  },
];

export default function GoldPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [goldAmount, setGoldAmount] = useState("1");

  const numericGoldAmount = Number(goldAmount);

  const isValidGoldAmount =
    !isNaN(numericGoldAmount) &&
    numericGoldAmount >= 0.1 &&
    numericGoldAmount <= 100;

  const totalPrice = useMemo(() => {
    if (!isValidGoldAmount) return 0;
    return numericGoldAmount * GOLD_PRICE_PER_GRAM;
  }, [numericGoldAmount, isValidGoldAmount]);

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/gold");
      return;
    }

    setIsBuyModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (!isValidGoldAmount) {
      toast.error("لطفاً مقدار معتبری وارد کنید (حداقل ۰.۱ گرم)");
      return;
    }

    toast.success(
      `درخواست خرید ${numericGoldAmount.toLocaleString(
        "fa-IR"
      )} گرم طلا با موفقیت ثبت شد.`
    );

    setIsBuyModalOpen(false);
    setGoldAmount("1");
  };

  const handleCloseModal = () => {
    setIsBuyModalOpen(false);
    setGoldAmount("1");
  };

  return (
    <div className="relative isolate min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative z-0 overflow-hidden bg-[#1a1c1e] py-12 text-white md:py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div className="text-right">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-yellow-300">
                <Sparkles size={16} />
                خرید و فروش آنلاین طلا
              </div>

              <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
                خرید آنلاین
                <span className="mx-2 text-yellow-400">طلا و نقره دیجیتال</span>
                با امنیت بالا
              </h1>

              <p className="mb-8 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                بدون نیاز به نگهداری فیزیکی، به‌صورت آنلاین طلا بخرید، ارزش
                سرمایه خود را حفظ کنید و هر زمان که خواستید به‌صورت سریع نقد
                کنید.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  onClick={handleBuyClick}
                  className="rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
                >
                  خرید طلا
                </button>

                <button className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  مشاهده جزئیات
                  <ChevronLeft size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {features.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="mb-2 text-yellow-400">{item.icon}</div>
                    <h3 className="mb-1 text-sm font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/gold-ingot.png"
                alt="طلا و نقره دیجیتال"
                className="w-65 drop-shadow-2xl md:w-85"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chart + Benefits Section */}
      <section className="relative z-10 mt-8 bg-white px-4">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start">
            {/* Benefits Cards */}
            <div className="relative z-10 grid w-full grid-cols-2 gap-3 lg:w-[320px] lg:gap-4">
              <div className="rounded-3xl bg-gray-50 p-5 transition-colors hover:bg-yellow-50">
                <ShieldCheck className="mb-3 text-yellow-600" size={32} />
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  امنیت تضمینی
                </h3>
                <p className="text-xs text-gray-500">پشتوانه ۱۰۰٪ طلا</p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-5 transition-colors hover:bg-blue-50">
                <Wallet className="mb-3 text-blue-600" size={32} />
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  نقدشوندگی
                </h3>
                <p className="text-xs text-gray-500">تسویه آنی ریالی</p>
              </div>

              <div className="col-span-2 rounded-3xl bg-gray-50 p-5 transition-colors hover:bg-green-50">
                <TrendingUp className="mb-3 text-green-600" size={32} />
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  رشد سرمایه
                </h3>
                <p className="text-xs text-gray-500">
                  مناسب برای حفظ ارزش دارایی در بلندمدت
                </p>
              </div>

              <div className="col-span-2 overflow-hidden rounded-3xl bg-linear-to-b from-zinc-900 to-zinc-800 p-5 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="text-yellow-400" size={22} />
                  <h3 className="text-sm font-bold">اپلیکیشن خرید طلا</h3>
                </div>

                <p className="mb-4 text-xs leading-6 text-gray-300">
                  با اپلیکیشن اختصاصی، خرید و مدیریت دارایی طلای خود را در هر
                  زمان و هر مکان انجام دهید.
                </p>

                <MobileAnimation />
              </div>
            </div>

            {/* Chart */}
            <div className="relative z-10 min-w-0 flex-1 rounded-4xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/50 md:p-6">
              <GoldPriceChart />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl border border-yellow-100 bg-linear-to-r from-yellow-50 to-orange-50 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2 text-yellow-700">
              <Info size={20} />
              <span className="text-sm font-bold">چرا خرید طلای دیجیتال؟</span>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-5">
                <h3 className="mb-2 text-sm font-bold text-gray-900">
                  بدون دغدغه نگهداری
                </h3>
                <p className="text-xs leading-6 text-gray-600">
                  دیگر نیازی به نگرانی بابت سرقت، گم‌شدن یا نگهداری فیزیکی طلا
                  ندارید.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-5">
                <h3 className="mb-2 text-sm font-bold text-gray-900">
                  شروع با مبالغ کم
                </h3>
                <p className="text-xs leading-6 text-gray-600">
                  حتی با سرمایه کم هم می‌توانید خرید طلا را شروع کنید و به‌مرور
                  دارایی خود را افزایش دهید.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-5">
                <h3 className="mb-2 text-sm font-bold text-gray-900">
                  معامله سریع و آنلاین
                </h3>
                <p className="text-xs leading-6 text-gray-600">
                  خرید و فروش تنها با چند کلیک انجام می‌شود و فرآیند کاملاً
                  سریع، ساده و شفاف است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Modal */}
      {isBuyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-900">خرید طلا</h2>
                <p className="mt-1 text-xs text-gray-500">
                  مقدار موردنظر خود را وارد کنید
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 rounded-2xl bg-yellow-50 p-4">
              <div className="mb-1 text-xs text-gray-500">قیمت هر گرم</div>
              <div className="text-lg font-bold text-gray-900">
                {GOLD_PRICE_PER_GRAM.toLocaleString("fa-IR")} تومان
              </div>
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              مقدار طلا (گرم)
            </label>

            <input
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              value={goldAmount}
              onChange={(e) => setGoldAmount(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500"
              placeholder="مثلاً 1"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setGoldAmount(String(amount))}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-yellow-500 hover:text-yellow-700"
                >
                  {amount.toLocaleString("fa-IR")} گرم
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">حداقل خرید</span>
                <span className="font-medium text-gray-800">۰.۱ گرم</span>
              </div>

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">حداکثر خرید</span>
                <span className="font-medium text-gray-800">۱۰۰ گرم</span>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">مبلغ نهایی</span>
                  <span className="text-lg font-bold text-gray-900">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>
            </div>

            {!isValidGoldAmount && (
              <p className="mt-3 text-xs text-red-500">
                مقدار واردشده باید بین ۰.۱ تا ۱۰۰ گرم باشد.
              </p>
            )}

            <button
              onClick={handleConfirmPurchase}
              disabled={!isValidGoldAmount}
              className="mt-6 w-full rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              تأیید خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
