import { CartItem } from "./cart";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered";

export type OrderType = "product" | "gold";

export type Order = {
  id: string;
  userPhone: string;
  receiverName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;

  // اطلاعات مربوط به نوع سفارش
  orderType?: OrderType;

  // اطلاعات اختصاصی خرید طلا
  goldWeight?: number;
  goldPricePerGram?: number;
};
