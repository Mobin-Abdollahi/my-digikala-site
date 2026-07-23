export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userPhone: string;
  items: OrderItem[];
  totalPrice: number;
  receiverName: string;
  phone: string;
  address: string;
  createdAt: string;
  status: OrderStatus;
}
