"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { time: "19:00", price: 187120 },
  { time: "22:00", price: 187540 },
  { time: "01:00", price: 187460 },
  { time: "04:00", price: 187880 },
  { time: "07:03", price: 187320 },
  { time: "10:05", price: 186940 },
  { time: "13:05", price: 186350 },
  { time: "16:07", price: 186760 },
  { time: "19:07", price: 186526 },
];

const toPersianNumber = (value: number | string) =>
  new Intl.NumberFormat("fa-IR").format(Number(value));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-zinc-500">ساعت {label}</p>
      <p className="mt-1 text-sm font-bold text-teal-700">
        {toPersianNumber(payload[0].value)} ریال
      </p>
    </div>
  );
};

export default function GoldPriceChart() {
  const prices = chartData.map((item) => item.price);
  const currentPrice = chartData[chartData.length - 1].price;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const diffPercent = (((currentPrice - maxPrice) / maxPrice) * 100).toFixed(2);

  return (
    <div className="w-full">
      {/* top price box */}
      <div className="mb-4 rounded-2xl bg-zinc-50 px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            <span>نرخ لحظه‌ای ۱ میلی‌گرم طلا</span>
          </div>

          <div className="text-left text-xl font-extrabold text-zinc-700">
            {toPersianNumber(currentPrice)} ریال
          </div>
        </div>
      </div>

      {/* date box */}
      <div className="mb-4 rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        قیمت طلا امروز ۹ مرداد ۱۴۰۵ ساعت ۱۹:۳۴
      </div>

      {/* chart card inner */}
      <div className="rounded-[22px] border border-zinc-200 p-4">
        {/* chart header */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="text-sm leading-6 text-zinc-500">
            <p>قیمت</p>
            <p>میلی‌گرم (ریال)</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-teal-600 px-4 py-1.5 text-sm text-teal-700">
              ۳۰ روز
            </button>
            <button className="rounded-full border border-teal-600 px-4 py-1.5 text-sm text-teal-700">
              ۷ روز
            </button>
            <button className="rounded-full bg-[#0a5c63] px-4 py-1.5 text-sm text-white">
              ۲۴ ساعت
            </button>
          </div>
        </div>

        {/* chart */}
        <div className="h-65 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f9f9a" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#0f9f9a" stopOpacity={0.04} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#d9e2e1"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 11 }}
                dy={8}
              />

              <YAxis
                orientation="left"
                axisLine={false}
                tickLine={false}
                width={75}
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(value) => toPersianNumber(value)}
                domain={[minPrice - 300, maxPrice + 300]}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="price"
                stroke="#149b97"
                strokeWidth={2.5}
                fill="url(#goldFill)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#149b97",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* bottom stats */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-zinc-50 px-4 py-3">
            <p className="mb-2 text-xs text-zinc-500">بالاترین قیمت</p>
            <p className="text-lg font-bold text-zinc-800">
              {toPersianNumber(maxPrice)} ریال
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 px-4 py-3">
            <p className="mb-2 text-xs text-zinc-500">پایین‌ترین قیمت</p>
            <p className="text-lg font-bold text-zinc-800">
              {toPersianNumber(minPrice)} ریال
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 px-4 py-3">
            <p className="mb-2 text-xs text-zinc-500">تغییرات</p>
            <p className="text-lg font-bold text-rose-500">
              %{toPersianNumber(diffPercent)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
