import type { CartItem } from "./cart";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

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
};
