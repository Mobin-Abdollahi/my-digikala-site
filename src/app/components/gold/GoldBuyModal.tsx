"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Info } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../store/auth-context";
import { createGoldOrder } from "../../utils/orders";

type GoldBuyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GOLD_PRICE_PER_GRAM = 7_450_000;
const MIN_GOLD_AMOUNT = 0.1;
const MAX_GOLD_AMOUNT = 100;
const QUICK_AMOUNTS = [0.5, 1, 2, 5];

export default function GoldBuyModal({
  isOpen,
  onClose,
}: GoldBuyModalProps) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const [goldAmount, setGoldAmount] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const numericGoldAmount = Number(goldAmount);

  const isValidGoldAmount =
    Number.isFinite(numericGoldAmount) &&
    numericGoldAmount >= MIN_GOLD_AMOUNT &&
    numericGoldAmount <= MAX_GOLD_AMOUNT;

  const totalPrice = isValidGoldAmount
    ? numericGoldAmount * GOLD_PRICE_PER_GRAM
    : 0;

  const formatPrice = (price: number) =>
    price.toLocaleString("fa-IR");

  const handleConfirmPurchase = async () => {
    if (!isLoggedIn || !user) {
      onClose();
      router.push("/login?redirect=/gold");
      return;
    }

    if (!isValidGoldAmount) {
      toast.error("مقدار طلا باید بین ۰.۱ تا ۱۰۰ گرم باشد.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createGoldOrder({
        receiverName: user.name,
        phone: user.phone,
        goldWeight: numericGoldAmount,
        goldPricePerGram: GOLD_PRICE_PER_GRAM,
        totalPrice,
      });

      if (result.success && result.order) {
        toast.success("سفارش خرید طلا با موفقیت ثبت شد.");
        onClose();
        setGoldAmount("1");
        router.push(`/order-success?orderId=${result.order.id}`);
      } else {
        toast.error(result.message || "خطایی در ثبت سفارش رخ داد.");
      }
    } catch {
      toast.error("ثبت سفارش با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setGoldAmount("1");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-900">
              خرید طلای دیجیتال
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              مقدار طلای موردنظر خود را وارد کنید
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 rounded-2xl bg-yellow-50 p-4">
          <p className="mb-1 text-xs text-zinc-500">
            قیمت هر گرم طلا
          </p>

          <p className="text-lg font-black text-zinc-900">
            {formatPrice(GOLD_PRICE_PER_GRAM)} تومان
          </p>
        </div>

        <label
          htmlFor="goldAmount"
          className="mb-2 block text-sm font-bold text-zinc-700"
        >
          مقدار طلا به گرم
        </label>

        <input
          id="goldAmount"
          type="number"
          min={MIN_GOLD_AMOUNT}
          max={MAX_GOLD_AMOUNT}
          step="0.1"
          value={goldAmount}
          onChange={(event) => setGoldAmount(event.target.value)}
          className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-left outline-none transition focus:border-yellow-500"
          placeholder="مثلاً ۱"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setGoldAmount(String(amount))}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm transition hover:border-yellow-500 hover:text-yellow-700"
            >
              {amount.toLocaleString("fa-IR")} گرم
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-zinc-500">حداقل خرید</span>
            <span className="font-bold text-zinc-800">۰.۱ گرم</span>
          </div>

          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-zinc-500">حداکثر خرید</span>
            <span className="font-bold text-zinc-800">۱۰۰ گرم</span>
          </div>

          <div className="border-t border-zinc-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                مبلغ نهایی
              </span>

              <span className="text-lg font-black text-zinc-900">
                {formatPrice(totalPrice)} تومان
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-zinc-500">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            این سفارش به‌صورت دیجیتال ثبت می‌شود و جزئیات آن در پروفایل شما
            قابل مشاهده است.
          </p>
        </div>

        {!isValidGoldAmount && (
          <p className="mt-3 text-xs text-red-500">
            مقدار واردشده باید بین ۰.۱ تا ۱۰۰ گرم باشد.
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirmPurchase}
          disabled={!isValidGoldAmount || isSubmitting}
          className="mt-6 w-full rounded-2xl bg-yellow-500 py-3 text-sm font-black text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          {isSubmitting ? "در حال ثبت سفارش..." : "تأیید و ثبت خرید"}
        </button>
      </div>
    </div>
  );
}
