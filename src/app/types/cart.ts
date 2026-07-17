import type { Product } from "../types/product";

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" };
