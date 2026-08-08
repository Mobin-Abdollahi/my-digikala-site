"use client";

import React, { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimeRange = "24h" | "7d" | "30d";

// تابع فارسی‌ساز اعداد
const toPersianNumber = (value: number | string) =>
  new Intl.NumberFormat("fa-IR").format(Number(value));

// تابع تولید داده داینامیک
const generateData = (range: TimeRange) => {
  const data = [];
  const now = new Date();
  const basePrice = 186526;
  const points = range === "24h" ? 9 : range === "7d" ? 7 : 12;

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    if (range === "24h") date.setHours(now.getHours() - i * 3);
    else date.setDate(now.getDate() - i);

    const timeStr = range === "24h" 
      ? date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("fa-IR", { month: "numeric", day: "numeric" });

    const randomVariation = Math.floor(Math.random() * 1500) - 750;
    data.push({
      time: timeStr,
      price: basePrice + randomVariation + (points - i) * 50,
    });
  }
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, range }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-zinc-500">{range === "24h" ? `ساعت ${label}` : `تاریخ ${label}`}</p>
      <p className="mt-1 text-sm font-bold text-teal-700">
        {toPersianNumber(payload[0].value)} ریال
      </p>
    </div>
  );
};

export default function GoldPriceChart() {
  const [range, setRange] = useState<TimeRange>("24h");

  const chartData = useMemo(() => generateData(range), [range]);

  const { minPrice, maxPrice, currentPrice, diffPercent } = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const curr = prices[prices.length - 1];
    const first = prices[0];
    const diff = (((curr - first) / first) * 100).toFixed(2);
    return { minPrice: min, maxPrice: max, currentPrice: curr, diffPercent: diff };
  }, [chartData]);

  return (
    <div className="w-full" dir="rtl">
      {/* top price box */}
      <div className="mb-4 rounded-2xl bg-zinc-50 px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>نرخ لحظه‌ای ۱ میلی‌گرم طلا</span>
          </div>
          <div className="text-left text-xl font-extrabold text-zinc-700">
            {toPersianNumber(currentPrice)} ریال
          </div>
        </div>
      </div>

      {/* date box */}
      <div className="mb-4 rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        قیمت طلا امروز {new Date().toLocaleDateString("fa-IR")} ساعت {new Date().toLocaleTimeString("fa-IR", { hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* chart card inner */}
      <div className="rounded-[22px] border border-zinc-200 p-4 bg-white">
        {/* chart header */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="text-sm leading-6 text-zinc-500">
            <p>قیمت</p>
            <p>میلی‌گرم (ریال)</p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setRange("30d")}
              className={`rounded-full px-4 py-1.5 text-sm transition ${range === "30d" ? "bg-[#0a5c63] text-white" : "border border-teal-600 text-teal-700"}`}
            >
              ۳۰ روز
            </button>
            <button 
              onClick={() => setRange("7d")}
              className={`rounded-full px-4 py-1.5 text-sm transition ${range === "7d" ? "bg-[#0a5c63] text-white" : "border border-teal-600 text-teal-700"}`}
            >
              ۷ روز
            </button>
            <button 
              onClick={() => setRange("24h")}
              className={`rounded-full px-4 py-1.5 text-sm transition ${range === "24h" ? "bg-[#0a5c63] text-white" : "border border-teal-600 text-teal-700"}`}
            >
              ۲۴ ساعت
            </button>
          </div>
        </div>

        {/* chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f9f9a" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#0f9f9a" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#d9e2e1" strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#71717a", fontSize: 11 }} 
                dy={8}
                reversed
              />
              <YAxis 
                orientation="left" 
                axisLine={false} 
                tickLine={false} 
                width={75} 
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(value) => toPersianNumber(value)}
                domain={[minPrice - 500, maxPrice + 500]} 
              />
              <Tooltip content={<CustomTooltip range={range} />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#149b97"
                strokeWidth={2.5}
                fill="url(#goldFill)"
                dot={false}
                activeDot={{ r: 5, fill: "#149b97", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* bottom stats */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <StatBox label="بالاترین قیمت" value={`${toPersianNumber(maxPrice)} ریال`} />
          <StatBox label="پایین‌ترین قیمت" value={`${toPersianNumber(minPrice)} ریال`} />
          <StatBox 
            label="تغییرات" 
            value={`%${toPersianNumber(diffPercent)}`} 
            valueClass={Number(diffPercent) >= 0 ? "text-emerald-500" : "text-rose-500"} 
          />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, valueClass = "text-zinc-800" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-4 py-3">
      <p className="mb-2 text-xs text-zinc-500">{label}</p>
      <p className={`text-lg font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}
