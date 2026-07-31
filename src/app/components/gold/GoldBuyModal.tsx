"use client";
import { useState } from "react";

export default function GoldBuyModal({ isOpen, onClose, goldPrice }: { isOpen: boolean, onClose: () => void, goldPrice: number }) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const weight = amount ? (Number(amount) / goldPrice).toFixed(4) : "0";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">خرید طلای دیجیتال</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">مبلغ خرید (تومان)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مثلاً ۱,۰۰۰,۰۰۰"
              className="w-full border-b-2 border-gray-100 py-3 text-2xl font-bold outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>وزن تقریبی طلا:</span>
              <span className="font-bold text-gray-900">{weight} گرم</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>قیمت لحظه‌ای هر گرم:</span>
              <span>{goldPrice.toLocaleString()} تومان</span>
            </div>
          </div>

          <button 
            className="w-full rounded-xl bg-[#083c46] py-4 font-bold text-white transition-opacity hover:opacity-90"
            onClick={() => alert(`درخواست خرید ${weight} گرم طلا ثبت شد.`)}
          >
            تایید و پرداخت نهایی
          </button>
        </div>
      </div>
    </div>
  );
}
