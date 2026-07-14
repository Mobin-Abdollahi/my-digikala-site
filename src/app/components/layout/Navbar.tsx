export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="text-xl font-extrabold text-red-600">DIGI</div>
        </div>

        <div className="hidden flex-1 px-6 md:block">
          <input
            type="text"
            placeholder="جستجوی کالا"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 text-sm outline-none transition focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700">
            ورود | ثبت نام
          </button>

          <button className="rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-700">
            سبد خرید
          </button>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 py-3 text-sm text-zinc-600 md:flex">
        <span className="cursor-pointer hover:text-red-600">سوپرمارکت</span>
        <span className="cursor-pointer hover:text-red-600">موبایل</span>
        <span className="cursor-pointer hover:text-red-600">کالای دیجیتال</span>
        <span className="cursor-pointer hover:text-red-600">لوازم خانگی</span>
        <span className="cursor-pointer hover:text-red-600">مد و پوشاک</span>
        <span className="cursor-pointer hover:text-red-600">کتاب و لوازم تحریر</span>
      </div>
    </header>
  );
}
