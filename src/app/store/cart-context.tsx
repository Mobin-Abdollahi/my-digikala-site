/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useMemo, useReducer, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, CartState } from "../types/cart";
import type { Product } from "../types/product";

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product | CartItem; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product | CartItem, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return initialState;

    case "SET_CART":
      return {
        items: action.payload,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        const parsedItems: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: "SET_CART", payload: parsedItems });
      } catch (e) {
        console.error("خطا در خواندن سبد خرید:", e);
      }
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value: CartContextType = {
    items: isMounted ? state.items : [],
    totalItems: isMounted ? totalItems : 0,
    addToCart: (product, quantity = 1) => {
      if (quantity <= 0) return;

      dispatch({
        type: "ADD_TO_CART",
        payload: { product, quantity },
      });
    },
    removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    increaseQuantity: (id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }),
    decreaseQuantity: (id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
