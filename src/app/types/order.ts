import type { CartItem } from "./cart";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export type OrderType = "product" | "gold";

export type Order = {
  id: string;
  userId?: string;
  userPhone: string;
  receiverName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  orderType?: OrderType;
  goldWeight?: number;
  goldPricePerGram?: number;
};
