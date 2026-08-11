// src/global.d.ts
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var orders: any[]; // یا تایپ دقیق Order[] که قبلاً داشتی
}
